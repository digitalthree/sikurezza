import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {
    addComunicazioneInComunicazioni,
    addImpresa, ImpresaSelezionataSelector,
    ImpreseDaCreareSelector, removeImpresa, setComunicazioneInComunicazioni,
    setFileInDocumenti,
    setImpresaDaCreare, setLogoImpresa, setObjectToCreate
} from "../../../../../../store/impresaSlice";
import {Impresa, impresaTemporanea, ItemComunicazione} from "../../../../../../model/Impresa";
import {uploadFileS3} from "../../../../../../aws/s3APIs";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import { useDynamoDBQuery } from '../../../../../../dynamodb/hook/useDynamoDBQuery';
import { createImpresaInDynamo, updateImpresaInDynamo } from '../../../../../../dynamodb/api/impresaAPIs';

interface ComunicazioniProps {
}

export const ComunicazioniImpresa: React.FC<ComunicazioniProps> = ({}) => {

    const dispatch = useDispatch()
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    const impresaDaCreare = useSelector(ImpreseDaCreareSelector)
    const [uploadToDynamo, setUploadToDynamo] = useState(false)
    const [creaImpresa, setCreaImpresa] = useState(false)
    const [aggiornaImpresa, setAggiornaImpresa] = useState(false)
    const [nuovaMansione, setNuovaMansione] = useState<ItemComunicazione>({
        mansione: "", telefono: "", nome: "", email: ""
    })


    const {user} = useAuth0()

    const {execQuery2} = useDynamoDBQuery()
    const navigate = useNavigate()

    const {handleSubmit} = useForm();
    const onSubmit = () => {
        impresaDaCreare.documentiIdoneitaImpresa.forEach(d => {
            if (d.file && typeof d.file.value !== 'string') {
                uploadFileS3(d.file.value as File).then(res => {
                    dispatch(setFileInDocumenti({nome: d.nome, file: {nome: d.file.nome, value: res?.key as string}}))
                })
            }
        })
        /*if(impresaDaCreare.anagrafica.logo.value && typeof impresaDaCreare.anagrafica.logo.value !== "string"){
            uploadFileS3(impresaDaCreare.anagrafica.logo.value).then(res => {
                dispatch(setLogoImpresa(res?.key))
            })
        }*/
    }

    useEffect(() => {
        if (impresaDaCreare.documentiIdoneitaImpresa.filter(d => !d.file.value || typeof d.file.value === 'string').length === impresaDaCreare.documentiIdoneitaImpresa.length
            //|| !impresaDaCreare.anagrafica.logo.value || typeof impresaDaCreare.anagrafica.logo.value === 'string'
        ) {
            setUploadToDynamo(true)
        }
    }, [impresaDaCreare])

    useEffect(() => {
        //TODO: aggiungere l'update dell'impresa nel caso in cui l'utente sia nel tab anagrafica della sezione impresa
        if (uploadToDynamo && creaImpresa) {
            let id = crypto.randomUUID()
            execQuery2(createImpresaInDynamo, {
                ...impresaDaCreare,
                creatoDa: user?.email,
                id: id
            }).then((res) => {
                console.log(res)
                dispatch(addImpresa({
                    ...impresaDaCreare,
                    creatoDa: user?.email as string,
                    id: id
                }))
                dispatch(setImpresaDaCreare(impresaTemporanea))
                dispatch(setObjectToCreate(undefined))
                navigate('/')
            }).catch(err => {
                dispatch(setImpresaDaCreare(impresaTemporanea))
                dispatch(setObjectToCreate(undefined))
                console.log(err)
                navigate('/')
            })
        }
        if (uploadToDynamo && aggiornaImpresa) {
            execQuery2(updateImpresaInDynamo, {
                ...impresaDaCreare,
                creatoDa: user?.email
            }).then((res) => {
                dispatch(removeImpresa(impresaSelezionata as Impresa))
                dispatch(addImpresa({
                    ...impresaDaCreare,
                    creatoDa: user?.email as string,
                }))
                dispatch(setImpresaDaCreare(impresaTemporanea))
                dispatch(setObjectToCreate(undefined))
                navigate('/')
            }).catch(err => {
                dispatch(setImpresaDaCreare(impresaTemporanea))
                dispatch(setObjectToCreate(undefined))
                console.log(err)
                navigate('/')
            })
        }
    }, [uploadToDynamo, creaImpresa, aggiornaImpresa])


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[50%] p-10 shadow-2xl flex flex-col">
                {impresaDaCreare.comunicazioni.map(c => {
                    return (
                        <div key={c.mansione}>
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{c.mansione}: </span>
                                <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                       onKeyDown={(e) => {
                                           if (e.key === "Enter") {
                                               e.preventDefault()
                                           }
                                       }}
                                       value={(impresaSelezionata) ? impresaSelezionata.comunicazioni.filter(cs => cs.mansione === c.mansione)[0].nome : c.nome}
                                       onChange={e => dispatch(setComunicazioneInComunicazioni({
                                           mansione: c.mansione,
                                           attributo: 'nome',
                                           valore: e.target.value
                                       }))}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold">Telefono: </span>
                                <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                       onKeyDown={(e) => {
                                           if (e.key === "Enter") {
                                               e.preventDefault()
                                           }
                                       }}
                                       value={(impresaSelezionata) ? impresaSelezionata.comunicazioni.filter(cs => cs.mansione === c.mansione)[0].telefono : c.telefono}
                                       onChange={e => dispatch(setComunicazioneInComunicazioni({
                                           mansione: c.mansione,
                                           attributo: 'telefono',
                                           valore: e.target.value
                                       }))}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold">Email: </span>
                                <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                       onKeyDown={(e) => {
                                           if (e.key === "Enter") {
                                               e.preventDefault()
                                           }
                                       }}
                                       value={(impresaSelezionata) ? impresaSelezionata.comunicazioni.filter(cs => cs.mansione === c.mansione)[0].email : c.email}
                                       onChange={e => dispatch(setComunicazioneInComunicazioni({
                                           mansione: c.mansione,
                                           attributo: 'email',
                                           valore: e.target.value
                                       }))}
                                />
                            </div>
                            <hr className="mt-5 mb-5"/>
                        </div>
                    )
                })}
                {/* The button to open modal */}
                <label htmlFor="my-modal-4" className="btn btn-warning w-1/2 m-auto">Aggiungi Mansione</label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-4" className="modal-toggle"/>
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative">
                        <div className="flex justify-between items-center">
                            <span className="font-bold">Mansione: </span>
                            <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") {
                                           e.preventDefault()
                                       }
                                   }}
                                   onChange={e => {
                                       setNuovaMansione({
                                           ...nuovaMansione,
                                           mansione: e.target.value
                                       })
                                   }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="font-bold">Nome: </span>
                            <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") {
                                           e.preventDefault()
                                       }
                                   }}
                                   onChange={e => {
                                       setNuovaMansione({
                                           ...nuovaMansione,
                                           nome: e.target.value
                                       })
                                   }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="font-bold">Telefono: </span>
                            <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") {
                                           e.preventDefault()
                                       }
                                   }}
                                   onChange={e => {
                                       setNuovaMansione({
                                           ...nuovaMansione,
                                           telefono: e.target.value
                                       })
                                   }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="font-bold">Email: </span>
                            <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") {
                                           e.preventDefault()
                                       }
                                   }}
                                   onChange={e => {
                                       setNuovaMansione({
                                           ...nuovaMansione,
                                           email: e.target.value
                                       })
                                   }}
                            />
                        </div>
                        <div className="modal-action"
                             onClick={() => dispatch(addComunicazioneInComunicazioni(nuovaMansione))}
                        >
                            <label htmlFor="my-modal-4" className="btn btn-warning">Crea Mansione</label>
                        </div>
                    </label>
                </label>
                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    {impresaSelezionata ?
                        <button type="submit"
                                onClick={() => setAggiornaImpresa(true)}
                                className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                            Aggiorna Impresa
                        </button> :
                        <button type="submit"
                                onClick={() => setCreaImpresa(true)}
                                className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                            Crea Impresa
                        </button>
                    }


                </div>
            </form>
        </>
    )

}