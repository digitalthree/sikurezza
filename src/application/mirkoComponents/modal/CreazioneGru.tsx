import React, {useEffect, useState} from 'react';
import {useFaunaQuery} from "../../../faunadb/hooks/useFaunaQuery";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../store/impresaSlice";
import {
    addGru,
    GruDaCreareSelector,
    GruSelezionataSelector,
    removeGru, setAttributoInGru, setDocumentoInGru, setGruDaCreare,
    setGruSelezionata, setVerificaInGru
} from "../../../store/gruSlice";
import {Gru, gruDefault} from "../../../model/Gru";
import {createGruInFauna, updateGruInFauna} from "../../../faunadb/api/gruAPIs";
import {uploadFileS3} from "../../../aws/s3APIs";
import VisualizzaEliminaFile from "../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../shared/Files/InputFile";

export interface CreazioneGruProps {
    editabile: boolean,
    modifica: boolean,
    setModifica: (v: boolean) => void
}

const CreazioneGru: React.FC<CreazioneGruProps> = (
    {
        editabile, modifica, setModifica
    }
) => {

    const {execQuery} = useFaunaQuery()
    const dispatch = useDispatch()
    const gruSelezionata = useSelector(GruSelezionataSelector)
    const gruDaCreare = useSelector(GruDaCreareSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    const [save, setSave] = useState(false)
    const [uploadToFauna, setUploadToFauna] = useState(false)
    const [gru, setGru] = useState<Gru>(gruDefault)

    const onSubmit =  (gru: Gru) => {
        gru.documenti.forEach(e => {
            if (e.file.value && typeof e.file.value !== 'string') {
                uploadFileS3(e.file.value).then((res) => {
                    if (res) {
                        dispatch(setDocumentoInGru({
                            nome: e.nome,
                            value: {...e, file: {...e.file, value: res?.key}}
                        }))
                    }
                });
            }
        })
        setSave(true)
    }

    useEffect(() => {
        if (gruSelezionata) {
            setGru(gruSelezionata)
        } else {
            setGru(gruDaCreare)
        }
        console.log(gruDaCreare)
    }, [gruDaCreare, gruSelezionata])

    useEffect(() => {
        if (gru.documenti.filter(d => !d.file.value || typeof d.file.value === 'string').length === gru.documenti.length) {
            setUploadToFauna(true)
        }else{
            setUploadToFauna(false)
        }
    }, [gru])

    useEffect(() => {
        console.log(save)
        if (save && uploadToFauna && !modifica) {
            execQuery(createGruInFauna, {
                ...gru,
                creataDa: impresaSelezionata?.faunaDocumentId
            }).then((res) => {
                dispatch(addGru({
                    ...gru,
                    faunaDocumentId: res.ref.value.id,
                    creataDa: impresaSelezionata?.faunaDocumentId as string
                }))
                dispatch(setGruSelezionata(undefined))
                dispatch(setGruDaCreare(gruDefault))
                setSave(false)
            })
        }
        if(save && uploadToFauna && modifica){
            execQuery(updateGruInFauna, {
                ...gru,
                creataDa: impresaSelezionata?.faunaDocumentId
            }).then(() => {
                dispatch(removeGru(gruSelezionata?.faunaDocumentId as string))
                dispatch(addGru({
                    ...gru,
                    creataDa: impresaSelezionata?.faunaDocumentId as string
                }))
                setModifica(false)
                dispatch(setGruSelezionata(undefined))
                dispatch(setGruDaCreare(gruDefault))
                setSave(false)
            })
        }
    }, [save, uploadToFauna, gru])

    return (
        <>
            <input type="checkbox" id="my-modal-5" className="modal-toggle"/>
            <label htmlFor="my-modal-5" className="modal cursor-pointer">
                <label className="modal-box relative max-w-5xl">
                    {gru.attr.map(a => {
                        console.log(a)
                        return (
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold">{a.label}</span>
                                {typeof a.value === 'string' && a.nome !== 'note' &&
                                    <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                           disabled={!editabile}
                                           value={a.value as string}
                                           onChange={e => {
                                               dispatch(setAttributoInGru({nome: a.nome, value: e.target.value}))
                                           }}
                                    />
                                }
                                {typeof a.value === 'boolean' &&
                                    <input type="checkbox" className="toggle"
                                           disabled={!editabile}
                                           checked={a.value as boolean}
                                           onChange={(e) => {
                                               dispatch(setAttributoInGru({nome: a.nome, value: e.target.checked}))
                                           }}
                                    />
                                }
                                {a.nome === 'note' &&
                                    <textarea className="rounded border border-gray-400 shadow p-1 col-span-9 w-1/2"
                                              disabled={!editabile}
                                              value={a.value as string}
                                              onChange={(e) => {
                                                  dispatch(setAttributoInGru({nome: a.nome, value: e.target.value}))
                                              }}
                                    />
                                }
                            </div>
                        )
                    })}
                    <hr className="mb-3"/>
                    {gru.verifiche.map(v => {
                        return (
                            <div className="grid grid-cols-4 gap-10 items-center mb-3">
                                <span className="font-bold">{v.label}: </span>
                                <div className="flex flex-col">
                                    <input type="date"
                                           className="rounded border border-gray-400 shadow p-1"
                                           disabled={!editabile}
                                           value={v.effettuataIl}
                                           onChange={(e) => {
                                               dispatch(setVerificaInGru({
                                                   nome: v.nome,
                                                   value: {...v, effettuataIl: e.target.value}
                                               }))
                                           }}
                                    />
                                </div>
                                <span className="font-bold">scadenza: </span>
                                <input type="date"
                                       className="rounded border border-gray-400 shadow p-1"
                                       disabled={!editabile}
                                       value={v.scadenza}
                                       onChange={(e) => {
                                           dispatch(setVerificaInGru({
                                               nome: v.nome,
                                               value: {...v, scadenza: e.target.value}
                                           }))
                                       }}
                                />
                            </div>
                        )
                    })}
                    <hr className="mb-3"/>
                    {gru.documenti.map(d => {
                        return (
                            <div className="grid grid-cols-7 mb-3">
                                <span className="font-bold col-span-3">{d.nome}: </span>
                                {typeof gru.documenti.filter(doc => doc.nome === d.nome)[0].presenza === 'boolean' ?
                                    <input type="checkbox" className="toggle col-span-1 m-auto"
                                           disabled={!editabile}
                                           checked={d.presenza as boolean}
                                           onChange={(e) => {
                                               dispatch(setDocumentoInGru({
                                                   nome: d.nome,
                                                   value: {...d, presenza: e.target.checked}
                                               }))
                                           }}
                                    />
                                    :
                                    <select
                                        value={d.presenza as ("SI" | "NO" | "NR")}
                                        onChange={(e) => {
                                            dispatch(setDocumentoInGru({
                                                nome: d.nome,
                                                value: {...d, presenza: e.target.value as ("SI" | "NO" | "NR")}
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
                                    {d.file.value ?
                                        <VisualizzaEliminaFile file={d.file.value} modifica={editabile} nome=""
                                                               eliminaFunction={() => {
                                                                   dispatch(setDocumentoInGru({
                                                                       nome: d.nome,
                                                                       value: {...d, file: {nome: "", value: undefined}}
                                                                   }))
                                                               }
                                                               }
                                        /> :
                                        <InputFile editabile={editabile} onChangeFunction={(e) => {
                                            dispatch(setDocumentoInGru({
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
                    {editabile &&
                        <div className="modal-action"
                             onClick={() => onSubmit(gru)}
                        >
                            <label htmlFor="my-modal-5" className="btn btn-warning w-full">{editabile && !modifica ? 'Crea Gru' : 'Modifica Gru'}</label>
                        </div>
                    }

                </label>
            </label>
        </>
    )
}

export default CreazioneGru