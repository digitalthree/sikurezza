import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addMaestranzaToMaestranzaSlice,
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    removeMaestranzaToMaestranzaSlice, setComunicazioniInMaestranza,
    setFileInDocumentiMaestranza,
    setMaestranzaDaCreare,
} from "../../../../../../store/maestranzaSlice";
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useFaunaQuery} from "../../../../../../faunadb/hooks/useFaunaQuery";
import {uploadFileS3} from "../../../../../../aws/s3APIs";
import {createMaestranzaInFauna, updateMaestranzaInFauna} from "../../../../../../faunadb/api/maestranzaAPIs";
import {maestranzaDefault} from "../../../../../../model/Maestranza";
import {useAuth0} from "@auth0/auth0-react";
import {
    addMaestranza,
    ImpresaSelezionataSelector,
    removeImpresa,
    setObjectToCreate
} from "../../../../../../store/impresaSlice";
import {useNavigate} from "react-router-dom";
import {updateImpresaInFauna} from "../../../../../../faunadb/api/impresaAPIs";

export interface ComunicazioniMaestranzaProps {
    editabile: boolean,
    modifica: boolean
}

const ComunicazioniMaestranza: React.FC<ComunicazioniMaestranzaProps> = (
    {editabile, modifica}
) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    const [maestranza, setMaestranza] = useState(maestranzaDaCreare)
    useEffect(() => {
        if(maestranzaSelezionata){
            setMaestranza(maestranzaSelezionata)
        }else{
            setMaestranza(maestranzaDaCreare)
        }
    }, [maestranzaDaCreare])
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const [spinner, setSpinner] = useState(false)
    const [uploadToFauna, setUploadToFauna] = useState(false)
    const [save, setSave] = useState(false)



    const {user} = useAuth0()
    const {execQuery} = useFaunaQuery()

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data: any) => {
        maestranza.documenti.forEach(e => {
            if(e.file && typeof e.file !== 'string'){
                uploadFileS3(e.file as File).then((res) => {
                    if (res) {
                        dispatch(setFileInDocumentiMaestranza({nome: e.nome, file: res.key}))
                    }
                });
            }
        })
        setSave(true)
    }

    useEffect(() => {
        if(maestranza.documenti.filter(d => !d.file || typeof d.file === 'string').length === Object.entries(maestranza.documenti).length){
            setUploadToFauna(true)
        }
    }, [maestranza])

    useEffect(() => {
        if(uploadToFauna && save && !modifica){
            setSpinner(true)
            execQuery(createMaestranzaInFauna, {...maestranza, creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}}).then((res) => {
                dispatch(addMaestranza({
                    impresa: impresaSelezionata?.faunaDocumentId as string,
                    maestranza: res.ref.value.id
                }))
                execQuery(updateImpresaInFauna, {
                    ...impresaSelezionata,
                    maestranze: [...impresaSelezionata?.maestranze as string[], res.ref.value.id]
                })
                dispatch(setMaestranzaDaCreare(maestranzaDefault))
                setSpinner(false)
                dispatch(setObjectToCreate(undefined))
                navigate(`/impresa/${impresaSelezionata?.faunaDocumentId}/maestranze`)
            })
        }
        if(uploadToFauna && save && modifica){
            setSpinner(true)
            execQuery(updateMaestranzaInFauna, {
                ...maestranza,
                creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string},
                faunaDocumentId: maestranzaSelezionata?.faunaDocumentId
            }).then((res) => {
                dispatch(removeMaestranzaToMaestranzaSlice(maestranzaSelezionata?.faunaDocumentId as string))
                dispatch(addMaestranzaToMaestranzaSlice({
                    ...res.data,
                    faunaDocumentId: maestranzaSelezionata?.faunaDocumentId,
                    creatoDa: {id: impresaSelezionata?.faunaDocumentId as string, nome: impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value as string}
                }))
                dispatch(setMaestranzaDaCreare(maestranzaDefault))
                setSpinner(false)
                dispatch(setObjectToCreate(undefined))
                navigate(`/impresa/${impresaSelezionata?.faunaDocumentId}/maestranze`)
            })
        }
    }, [uploadToFauna, save])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={`mt-20 w-[40%] p-10 shadow-2xl ${spinner && 'opacity-20'}`}
            >

                <div className="flex justify-between items-center">
                    <span className="font-bold">Telefono: </span>
                    <div className="flex flex-col">
                        <input placeholder="Telefono" {...register("telefono")}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               onChange={(e) => dispatch(setComunicazioniInMaestranza({nome: 'telefono', value: e.target.value}))}
                               defaultValue={maestranza.comunicazioni.telefono}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Cellulare privato: </span>
                    <div className="flex flex-col">
                        <input placeholder="Cellulare privato" {...register("cellularePrivato")}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               onChange={(e) => dispatch(setComunicazioniInMaestranza({nome: 'cellularePrivato', value: e.target.value}))}
                               defaultValue={maestranza.comunicazioni.cellularePrivato}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Cellulare aziendale: </span>
                    <div className="flex flex-col">
                        <input placeholder="Cellulare aziendale" {...register("cellulareAziendale")}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               onChange={(e) => dispatch(setComunicazioniInMaestranza({nome: 'cellulareAziendale', value: e.target.value}))}
                               defaultValue={maestranza.comunicazioni.cellulareAziendale}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Indirizzo mail*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Indirizzo mail" {...register("email", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               onChange={(e) => dispatch(setComunicazioniInMaestranza({nome: 'email', value: e.target.value}))}
                               defaultValue={maestranza.comunicazioni.email}
                        />
                        {errors.email && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>
                {editabile &&
                    <div className="flex mt-10">
                        <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                            <TfiSave size="30px" className="text-white"/>
                        </div>
                        <button type="submit"
                                className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                        >
                            {`${modifica ? 'Modifica Maestranza' : 'Crea Maestranza'}`}
                        </button>

                    </div>
                }
            </form>
            {spinner && (
                <div className="flex flex-col items-center fixed top-[50%]">
                    <progress className="progress progress-warning w-56"/>
                    <label htmlFor="">Creazione in corso</label>
                </div>
            )}
        </>
    )
}

export default ComunicazioniMaestranza