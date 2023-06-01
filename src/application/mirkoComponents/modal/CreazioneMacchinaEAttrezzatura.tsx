import React, {useEffect, useState} from 'react';
import {useFaunaQuery} from "../../../faunadb/hooks/useFaunaQuery";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../store/impresaSlice";
import {uploadFileS3} from "../../../aws/s3APIs";
import VisualizzaEliminaFile from "../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../shared/Files/InputFile";
import {
    addMacchinaEAttrezzatura,
    MacchinaEAttrezzaturaDaCreareSelector,
    MacchinaEAttrezzaturaSelezionatoSelector, removeMacchinaEAttrezzatura, setAttributoInMacchinaEAttrezzatura,
    setDocumentoInMacchinaEAttrezzatura,
    setMacchinaEAttrezzaturaDaCreare,
    setMacchinaEAttrezzaturaSelezionato, setUltimaRevisioneInMacchinaEAttrezzatura
} from "../../../store/macchinaEAttrezzaturaSlice";
import {MacchinaEAttrezzatura, macchinaEAttrezzaturaDefault} from "../../../model/MacchineEAttrezzature";
import {
    createMacchinaEAttrezzaturaInFauna,
    updateMacchinaEAttrezzaturaInFauna
} from "../../../faunadb/api/macchinaEAttrezzaturaAPIs";

export interface CreazioneMacchinaEAttrezzaturaProps{
    editabile: boolean,
    modifica: boolean,
    setModifica: (v: boolean) => void
}

const CreazioneMacchinaEAttrezzatura: React.FC<CreazioneMacchinaEAttrezzaturaProps> = (
    {
        editabile, modifica, setModifica
    }
) => {
    const {execQuery} = useFaunaQuery()
    const dispatch = useDispatch()
    const macchinaEAttrezzaturaSelezionato = useSelector(MacchinaEAttrezzaturaSelezionatoSelector)
    const macchinaEAttrezzaturaDaCreare = useSelector(MacchinaEAttrezzaturaDaCreareSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    const [save, setSave] = useState(false)
    const [uploadToFauna, setUploadToFauna] = useState(false)
    const [macchinaEAttrezzatura, setMacchinaEAttrezzatura] = useState<MacchinaEAttrezzatura>(macchinaEAttrezzaturaDefault)

    const onSubmit =  (macchinaEAttrezzatura: MacchinaEAttrezzatura) => {
        macchinaEAttrezzatura.documenti.forEach(d => {
            if (d.file.value && typeof d.file.value !== 'string') {
                uploadFileS3(d.file.value).then((res) => {
                    if (res) {
                        dispatch(setDocumentoInMacchinaEAttrezzatura({
                            nome: d.nome,
                            value: {...d, file: {...d.file, value: res?.key}}
                        }))
                    }
                });
            }
        })
        setSave(true)
    }

    useEffect(() => {
        if (macchinaEAttrezzaturaSelezionato) {
            setMacchinaEAttrezzatura(macchinaEAttrezzaturaSelezionato)
        } else {
            setMacchinaEAttrezzatura(macchinaEAttrezzaturaDaCreare)
        }
    }, [macchinaEAttrezzaturaDaCreare, macchinaEAttrezzaturaSelezionato])

    useEffect(() => {
        if (macchinaEAttrezzatura.documenti.filter(d => !d.file.value || typeof d.file.value === 'string').length === macchinaEAttrezzatura.documenti.length) {
            setUploadToFauna(true)
        }else{
            setUploadToFauna(false)
        }
    }, [macchinaEAttrezzatura])

    useEffect(() => {
        if (save && uploadToFauna && !modifica) {
            execQuery(createMacchinaEAttrezzaturaInFauna, {
                ...macchinaEAttrezzatura,
                creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}
            }).then((res) => {
                dispatch(addMacchinaEAttrezzatura({
                    ...macchinaEAttrezzatura,
                    faunaDocumentId: res.ref.value.id,
                    creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}
                }))
                dispatch(setMacchinaEAttrezzaturaSelezionato(undefined))
                dispatch(setMacchinaEAttrezzaturaDaCreare(macchinaEAttrezzaturaDefault))
                setSave(false)
            })
        }
        if(save && uploadToFauna && modifica){
            execQuery(updateMacchinaEAttrezzaturaInFauna, {
                ...macchinaEAttrezzatura,
                creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}
            }).then(() => {
                dispatch(removeMacchinaEAttrezzatura(macchinaEAttrezzaturaSelezionato?.faunaDocumentId as string))
                dispatch(addMacchinaEAttrezzatura({
                    ...macchinaEAttrezzatura,
                    creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}
                }))
                setModifica(false)
                dispatch(setMacchinaEAttrezzaturaSelezionato(undefined))
                dispatch(setMacchinaEAttrezzaturaDaCreare(macchinaEAttrezzaturaDefault))
                setSave(false)
            })
        }
    }, [save, uploadToFauna, macchinaEAttrezzatura])

    return(
        <>
            <input type="checkbox" id="my-modal-7" className="modal-toggle"/>
            <label htmlFor="my-modal-7" className="modal cursor-pointer">
                <label className="modal-box relative max-w-4xl">
                    {macchinaEAttrezzatura.attr.map(a => {
                        return (
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold">{a.label}</span>
                                {a.nome !== "categoria" ?
                                    <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                           onKeyDown={(e) => {
                                               if(e.key === "Enter"){
                                                   e.preventDefault()
                                               }
                                           }}
                                           disabled={!editabile}
                                           value={a.value as string}
                                           onChange={e => {
                                               dispatch(setAttributoInMacchinaEAttrezzatura({nome: a.nome, value: e.target.value}))
                                           }}
                                    /> :
                                    <select
                                        value={a.value as "Macchina" | "Attrezzatura"}
                                        onChange={(e) => dispatch(setAttributoInMacchinaEAttrezzatura({nome: a.nome, value: e.target.value}))}
                                        disabled={!editabile}
                                        className="rounded border border-gray-400 shadow p-1"
                                    >
                                        <option value="Macchina">Macchina</option>
                                        <option value="Attrezzatura">Attrezzatura</option>
                                    </select>

                                }
                            </div>
                        )
                    })}
                    <hr className="mb-3"/>
                    {macchinaEAttrezzatura.documenti.map(d => {
                        return (
                            <div className="grid grid-cols-7 mb-3">
                                <span className="font-bold col-span-3">{d.nome}: </span>
                                <input type="checkbox" className="toggle col-span-1 m-auto"
                                       onKeyDown={(e) => {
                                           if(e.key === "Enter"){
                                               e.preventDefault()
                                           }
                                       }}
                                       disabled={!editabile}
                                       checked={d.presenza as boolean}
                                       onChange={(e) => {
                                           dispatch(setDocumentoInMacchinaEAttrezzatura({
                                               nome: d.nome,
                                               value: {...d, presenza: e.target.checked}
                                           }))
                                       }}
                                />
                                <div className="col-span-3 m-auto mr-0">
                                    {d.file.value ?
                                        <VisualizzaEliminaFile file={d.file.value} modifica={editabile} nome=""
                                                               eliminaFunction={() => {
                                                                   dispatch(setDocumentoInMacchinaEAttrezzatura({
                                                                       nome: d.nome,
                                                                       value: {...d, file: {nome: "", value: undefined}}
                                                                   }))
                                                               }
                                                               }
                                        /> :
                                        <InputFile editabile={editabile} onChangeFunction={(e) => {
                                            dispatch(setDocumentoInMacchinaEAttrezzatura({
                                                nome: d.nome,
                                                value: {
                                                    ...d,
                                                    file: {
                                                        nome: "",
                                                        value: (e.target.files) ? e.target.files[0] : undefined
                                                    }
                                                }
                                            }))
                                        }
                                        }/>

                                    }
                                </div>
                            </div>
                        )
                    })}
                    <div className="grid grid-cols-4 gap-10 items-center mb-3">
                        <span className="font-bold">{macchinaEAttrezzatura.ultimaRevisione.label}: </span>
                        <div className="flex flex-col">
                            <input type="date"
                                   className="rounded border border-gray-400 shadow p-1"
                                   onKeyDown={(e) => {
                                       if(e.key === "Enter"){
                                           e.preventDefault()
                                       }
                                   }}
                                   disabled={!editabile}
                                   value={macchinaEAttrezzatura.ultimaRevisione.effettuataIl}
                                   onChange={(e) => {
                                       dispatch(setUltimaRevisioneInMacchinaEAttrezzatura({
                                           nome: macchinaEAttrezzatura.ultimaRevisione.nome,
                                           value: {...macchinaEAttrezzatura.ultimaRevisione, effettuataIl: e.target.value}
                                       }))
                                   }}
                            />
                        </div>
                        <span className="font-bold">scadenza: </span>
                        <input type="date"
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               value={macchinaEAttrezzatura.ultimaRevisione.scadenza}
                               onChange={(e) => {
                                   dispatch(setUltimaRevisioneInMacchinaEAttrezzatura({
                                       nome: macchinaEAttrezzatura.ultimaRevisione.nome,
                                       value: {...macchinaEAttrezzatura.ultimaRevisione, scadenza: e.target.value}
                                   }))
                               }}
                        />
                    </div>
                    {editabile &&
                        <div className="modal-action"
                             onClick={() => onSubmit(macchinaEAttrezzatura)}
                        >
                            <label htmlFor="my-modal-7" className="btn btn-warning w-full">{editabile && !modifica ? 'Crea Macchina o Attrezzatura' : 'Modifica Macchina o Attrezzatura'}</label>
                        </div>
                    }
                </label>
            </label>
        </>
    )
}

export default CreazioneMacchinaEAttrezzatura