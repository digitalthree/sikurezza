import React, {useEffect, useState} from 'react';
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
import {uploadFileS3} from "../../../aws/s3APIs";
import VisualizzaEliminaFile from "../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../shared/Files/InputFile";
import { useDynamoDBQuery } from '../../../dynamodb/hook/useDynamoDBQuery';
import { createGruInDynamo, updateGruInDynamo } from '../../../dynamodb/api/gruAPIs';

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

    const {execQuery2} = useDynamoDBQuery()
    const dispatch = useDispatch()
    const gruSelezionata = useSelector(GruSelezionataSelector)
    const gruDaCreare = useSelector(GruDaCreareSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    const [save, setSave] = useState(false)
    const [uploadToDynamo, setUploadToDynamo] = useState(false)
    const [gru, setGru] = useState<Gru>(gruDefault)

    const onSubmit = (gru: Gru) => {
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
            setUploadToDynamo(true)
        } else {
            setUploadToDynamo(false)
        }
    }, [gru])

    useEffect(() => {
        console.log(save)
        if (save && uploadToDynamo && !modifica) {
            let id = crypto.randomUUID()
            execQuery2(createGruInDynamo, {
                ...gru,
                creatoDa: impresaSelezionata?.id as string,
                id: id
            }).then((res) => {
                dispatch(addGru({
                    ...gru,
                    id: id,
                    creatoDa: impresaSelezionata?.id as string,
                }))
                dispatch(setGruSelezionata(undefined))
                dispatch(setGruDaCreare(gruDefault))
                setSave(false)
            })
        }
        if (save && uploadToDynamo && modifica) {
            execQuery2(updateGruInDynamo, {
                ...gru,
                creatoDa: impresaSelezionata?.id as string,
            }).then(() => {
                dispatch(removeGru(gruSelezionata?.id as string))
                dispatch(addGru({
                    ...gru,
                    creatoDa: impresaSelezionata?.id as string,
                }))
                setModifica(false)
                dispatch(setGruSelezionata(undefined))
                dispatch(setGruDaCreare(gruDefault))
                setSave(false)
            })
        }
    }, [save, uploadToDynamo, gru])

    return (
        <>
            <input type="checkbox" id="my-modal-5" className="modal-toggle"/>
            <label htmlFor="my-modal-5" className="modal cursor-pointer">
                <label className="modal-box relative max-w-7xl">
                    {gru.attr.map(a => {
                        return (
                            <div className="flex justify-between items-center mb-3">
                                {a.nome !== "tecnicoIncaricatoAllaProgettazioneDellaStrutturaDiFondazione" &&
                                    <span className="font-bold">{a.label}</span>
                                }
                                {typeof a.value === 'string' && a.nome !== 'note' && a.nome !== "tecnicoIncaricatoAllaProgettazioneDellaStrutturaDiFondazione" &&
                                    <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                           onKeyDown={(e) => {
                                               if (e.key === "Enter") {
                                                   e.preventDefault()
                                               }
                                           }}
                                           disabled={!editabile}
                                           value={a.value as string}
                                           onChange={e => {
                                               dispatch(setAttributoInGru({nome: a.nome, value: e.target.value}))
                                           }}
                                    />
                                }
                                {typeof a.value === 'boolean' &&
                                    <div className="flex flex-row items-center">
                                        NO
                                        <input type="checkbox" className="toggle ml-2 mr-2"
                                               onKeyDown={(e) => {
                                                   if (e.key === "Enter") {
                                                       e.preventDefault()
                                                   }
                                               }}
                                               disabled={!editabile}
                                               checked={a.value as boolean}
                                               onChange={(e) => {
                                                   dispatch(setAttributoInGru({nome: a.nome, value: e.target.checked}))
                                               }}
                                        />
                                        SI
                                    </div>

                                }
                                {a.nome === 'note' &&
                                    <textarea className="rounded border border-gray-400 shadow p-1 col-span-9 w-1/2"
                                              onKeyDown={(e) => {
                                                  if (e.key === "Enter") {
                                                      e.preventDefault()
                                                  }
                                              }}
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
                                <span className="font-bold">{v.label} {v.nome === "verificaPeriodica" ? "(verifica annuale)" : "(verifica trimestrale)"}: </span>
                                <div className="flex flex-col">
                                    <input type="date"
                                           className="rounded border border-gray-400 shadow p-1"
                                           onKeyDown={(e) => {
                                               if (e.key === "Enter") {
                                                   e.preventDefault()
                                               }
                                           }}
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
                                       onKeyDown={(e) => {
                                           if (e.key === "Enter") {
                                               e.preventDefault()
                                           }
                                       }}
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
                    {gru.attr.map(a => {
                        if (a.nome === "tecnicoIncaricatoAllaProgettazioneDellaStrutturaDiFondazione") {
                            return (
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold">{a.label}</span>
                                    <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                           onKeyDown={(e) => {
                                               if (e.key === "Enter") {
                                                   e.preventDefault()
                                               }
                                           }}
                                           disabled={!editabile}
                                           value={a.value as string}
                                           onChange={e => {
                                               dispatch(setAttributoInGru({nome: a.nome, value: e.target.value}))
                                           }}
                                    />
                                </div>
                            )
                        }

                    })}
                    <hr className="mb-3"/>
                    {gru.documenti.map(d => {
                        return (
                            <div className="grid grid-cols-7 mb-3">
                                <span className="font-bold col-span-3">{d.nome}: </span>
                                {typeof gru.documenti.filter(doc => doc.nome === d.nome)[0].presenza === 'boolean' ?
                                    <div className="col-span-1 flex flex-row">
                                        NO
                                        <input type="checkbox" className="toggle col-span-1 mr-2 ml-2"
                                               onKeyDown={(e) => {
                                                   if (e.key === "Enter") {
                                                       e.preventDefault()
                                                   }
                                               }}
                                               disabled={!editabile}
                                               checked={d.presenza as boolean}
                                               onChange={(e) => {
                                                   dispatch(setDocumentoInGru({
                                                       nome: d.nome,
                                                       value: {...d, presenza: e.target.checked}
                                                   }))
                                               }}
                                        />
                                        SI
                                    </div>
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
                            <label htmlFor="my-modal-5"
                                   className="btn btn-warning w-full">{editabile && !modifica ? 'Crea Gru' : 'Modifica Gru'}</label>
                        </div>
                    }

                </label>
            </label>
        </>
    )
}

export default CreazioneGru