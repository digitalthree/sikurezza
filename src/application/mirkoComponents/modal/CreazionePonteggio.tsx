import React, {useEffect, useState} from 'react';
import {
    setDocumentoInGru
} from "../../../store/gruSlice";
import VisualizzaEliminaFile from "../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../shared/Files/InputFile";
import {useFaunaQuery} from "../../../faunadb/hooks/useFaunaQuery";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../store/impresaSlice";
import {
    addPonteggio,
    PonteggioDaCreareSelector,
    PonteggioSelezionatoSelector, removePonteggio, setAllegatoInPonteggio,
    setAttributoInPonteggio, setControlloInPonteggio, setPonteggioDaCreare, setPonteggioSelezionato
} from "../../../store/ponteggioSlice";
import {Ponteggio, ponteggioDefault} from "../../../model/Ponteggio";
import {uploadFileS3} from "../../../aws/s3APIs";
import {createPonteggioInFauna, updatePonteggioInFauna} from "../../../faunadb/api/ponteggioAPIs";

export interface CreazionePonteggioProps{
    editabile: boolean,
    modifica: boolean,
    setModifica: (v: boolean) => void
}

const CreazionePonteggio: React.FC<CreazionePonteggioProps> = (
    {
        editabile, modifica, setModifica
    }
) => {

    const {execQuery} = useFaunaQuery()
    const dispatch = useDispatch()
    const ponteggioSelezionato = useSelector(PonteggioSelezionatoSelector)
    const ponteggioDaCreare = useSelector(PonteggioDaCreareSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    const [save, setSave] = useState(false)
    const [uploadToFauna, setUploadToFauna] = useState(false)
    const [ponteggio, setPonteggio] = useState<Ponteggio>(ponteggioDefault)

    const onSubmit =  (ponteggio: Ponteggio) => {
        ponteggio.allegatiPonteggio.forEach(a => {
            if (a.file.value && typeof a.file.value !== 'string') {
                uploadFileS3(a.file.value).then((res) => {
                    if (res) {
                        dispatch(setAllegatoInPonteggio({
                            nome: a.nome,
                            value: {...a, file: {...a.file, value: res?.key}}
                        }))
                    }
                });
            }
        })
        ponteggio.controlli.forEach(c => {
            if (c.file.value && typeof c.file.value !== 'string') {
                uploadFileS3(c.file.value).then((res) => {
                    if (res) {
                        dispatch(setControlloInPonteggio({
                            nome: c.nome,
                            value: {...c, file: {...c.file, value: res?.key}}
                        }))
                    }
                });
            }
        })

        setSave(true)
    }

    useEffect(() => {
        if (ponteggioSelezionato) {
            setPonteggio(ponteggioSelezionato)
        } else {
            setPonteggio(ponteggioDaCreare)
        }
    }, [ponteggioDaCreare, ponteggioSelezionato])

    useEffect(() => {
        if (ponteggio.allegatiPonteggio.filter(a => !a.file.value || typeof a.file.value === 'string').length === ponteggio.allegatiPonteggio.length) {
            setUploadToFauna(true)
        }else{
            setUploadToFauna(false)
        }
    }, [ponteggio])

    useEffect(() => {
        if (save && uploadToFauna && !modifica) {
            execQuery(createPonteggioInFauna, {
                ...ponteggio,
                creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}
            }).then((res) => {
                dispatch(addPonteggio({
                    ...ponteggio,
                    faunaDocumentId: res.ref.value.id,
                    creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}
                }))
                dispatch(setPonteggioSelezionato(undefined))
                dispatch(setPonteggioDaCreare(ponteggioDefault))
                setSave(false)
            })
        }
        if(save && uploadToFauna && modifica){
            execQuery(updatePonteggioInFauna, {
                ...ponteggio,
                creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}
            }).then(() => {
                dispatch(removePonteggio(ponteggioSelezionato?.faunaDocumentId as string))
                dispatch(addPonteggio({
                    ...ponteggio,
                    creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}
                }))
                setModifica(false)
                dispatch(setPonteggioSelezionato(undefined))
                dispatch(setPonteggioDaCreare(ponteggioDefault))
                setSave(false)
            })
        }
    }, [save, uploadToFauna, ponteggio])

    return(
        <>
            <input type="checkbox" id="my-modal-6" className="modal-toggle"/>
            <label htmlFor="my-modal-6" className="modal cursor-pointer">
                <label className="modal-box relative max-w-4xl">
                    {ponteggio.attr.map(a => {
                        return (
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold">{a.label}</span>
                                {typeof a.value === 'string' && a.nome !== "altezzaPonteggio" &&
                                    <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                           onKeyDown={(e) => {
                                               if(e.key === "Enter"){
                                                   e.preventDefault()
                                               }
                                           }}
                                           disabled={!editabile}
                                           value={a.value as string}
                                           onChange={e => {
                                               dispatch(setAttributoInPonteggio({nome: a.nome, value: e.target.value}))
                                           }}
                                    />
                                }
                                {typeof a.value === 'boolean' &&
                                    <input type="checkbox" className="toggle"
                                           onKeyDown={(e) => {
                                               if(e.key === "Enter"){
                                                   e.preventDefault()
                                               }
                                           }}
                                           disabled={!editabile}
                                           checked={a.value as boolean}
                                           onChange={(e) => {
                                               dispatch(setAttributoInPonteggio({nome: a.nome, value: e.target.checked}))
                                           }}
                                    />
                                }
                                {a.nome === 'altezzaPonteggio' &&
                                    <select
                                        value={a.value as "<20m" | ">20m"}
                                        onChange={(e) => dispatch(setAttributoInPonteggio({nome: a.nome, value: e.target.value}))}
                                        disabled={!editabile}
                                        className="rounded border border-gray-400 shadow p-1"
                                    >
                                        <option value=">20m">{`> 20m`}</option>
                                        <option value="<20m">{`< 20m`}</option>
                                    </select>
                                }
                            </div>
                        )
                    })}
                    <hr className="mb-3"/>
                    {ponteggio.allegatiPonteggio.map(ap => {
                        return (
                            <div className="grid grid-cols-7 mb-3">
                                <span className="font-bold col-span-3">{ap.nome}: </span>
                                {typeof ponteggio.allegatiPonteggio.filter(al => al.nome === ap.nome)[0].presenza === 'boolean' ?
                                    <input type="checkbox" className="toggle col-span-1 m-auto"
                                           onKeyDown={(e) => {
                                               if(e.key === "Enter"){
                                                   e.preventDefault()
                                               }
                                           }}
                                           disabled={!editabile}
                                           checked={ap.presenza as boolean}
                                           onChange={(e) => {
                                               dispatch(setAllegatoInPonteggio({
                                                   nome: ap.nome,
                                                   value: {...ap, presenza: e.target.checked}
                                               }))
                                           }}
                                    />
                                    :
                                    <select
                                        value={ap.presenza as ("SI" | "NO" | "NR")}
                                        onChange={(e) => {
                                            dispatch(setAllegatoInPonteggio({
                                                nome: ap.nome,
                                                value: {...ap, presenza: e.target.value as ("SI" | "NO" | "NR")}
                                            }))
                                        }}
                                        disabled={!editabile}
                                        className="rounded border border-gray-400 shadow p-1"
                                    >
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                        <option value="NR">NR</option>
                                    </select>
                                }

                                <div className="col-span-3 m-auto mr-0">
                                    {ap.file.value ?
                                        <VisualizzaEliminaFile file={ap.file.value} modifica={editabile} nome=""
                                                               eliminaFunction={() => {
                                                                   dispatch(setAllegatoInPonteggio({
                                                                       nome: ap.nome,
                                                                       value: {...ap, file: {nome: "", value: undefined}}
                                                                   }))
                                                               }
                                                               }
                                        /> :
                                        <InputFile editabile={editabile} onChangeFunction={(e) => {
                                            dispatch(setAllegatoInPonteggio({
                                                nome: ap.nome,
                                                value: {
                                                    ...ap,
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
                    {ponteggio.controlli.map(c => {
                        return (
                            <>
                            <div className="grid grid-cols-3 gap-10 items-center mb-3">
                                <span className="font-bold">{c.nome}: </span>
                                <div className="flex flex-col">
                                    <input type="checkbox" className="toggle col-span-1 m-auto"
                                           onKeyDown={(e) => {
                                               if(e.key === "Enter"){
                                                   e.preventDefault()
                                               }
                                           }}
                                           disabled={!editabile}
                                           checked={c.effettuato}
                                           onChange={(e) => {
                                               dispatch(setControlloInPonteggio({
                                                   nome: c.nome,
                                                   value: {...c, effettuato: e.target.checked}
                                               }))
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-8 gap-10 items-center mb-3">
                                <span className="font-bold col-span-3">{`Data ultimo ${c.nome}:`}</span>
                                <input type="date"
                                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                                       onKeyDown={(e) => {
                                           if(e.key === "Enter"){
                                               e.preventDefault()
                                           }
                                       }}
                                       disabled={!editabile}
                                       value={c.data}
                                       onChange={(e) => {
                                           dispatch(setControlloInPonteggio({
                                               nome: c.nome,
                                               value: {...c, data: e.target.value}
                                           }))
                                       }}
                                />
                                <div className="col-span-3 m-auto mr-0">
                                {c.file.value ?
                                    <VisualizzaEliminaFile file={c.file.value} modifica={editabile} nome=""
                                                           eliminaFunction={() => {
                                                               dispatch(setControlloInPonteggio({
                                                                   nome: c.nome,
                                                                   value: {...c, file: {nome: "", value: undefined}}
                                                               }))
                                                           }
                                                           }
                                    /> :
                                    <InputFile editabile={editabile} onChangeFunction={(e) => {
                                        dispatch(setControlloInPonteggio({
                                            nome: c.nome,
                                            value: {
                                                ...c,
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
                            </>
                        )
                    })}
                    {editabile &&
                        <div className="modal-action"
                             onClick={() => onSubmit(ponteggio)}
                        >
                            <label htmlFor="my-modal-6" className="btn btn-warning w-full">{editabile && !modifica ? 'Crea Ponteggio' : 'Modifica Ponteggio'}</label>
                        </div>
                    }
                </label>
            </label>
        </>
    )
}

export default CreazionePonteggio