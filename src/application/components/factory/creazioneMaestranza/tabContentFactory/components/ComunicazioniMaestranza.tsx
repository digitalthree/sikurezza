import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addMaestranza,
    MaestranzaDaCreareSelector, setFileInDocumentiMaestranza, setMaestranzaDaCreare,
} from "../../../../../../store/maestranzaSlice";
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useFaunaQuery} from "../../../../../../faunadb/hooks/useFaunaQuery";
import {uploadFileS3} from "../../../../../../aws/s3APIs";
import {createMaestranzaInFauna} from "../../../../../../faunadb/api/maestranzaAPIs";
import {maestranzaDefault} from "../../../../../../model/Maestranza";
import {useAuth0} from "@auth0/auth0-react";

export interface ComunicazioniMaestranzaProps {
    setObjectToCreate: (s: string | undefined) => void
}

const ComunicazioniMaestranza: React.FC<ComunicazioniMaestranzaProps> = ({setObjectToCreate}) => {

    const dispatch = useDispatch()
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const [spinner, setSpinner] = useState(false)
    const [uploadToFauna, setUploadToFauna] = useState(false)
    const [comunicazioni, setComunicazioni] = useState<any>()

    const {user} = useAuth0()
    const {execQuery} = useFaunaQuery()

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data: any) => {
        setComunicazioni(data)
        maestranzaDaCreare.documenti.forEach(e => {
            if(e.file){
                uploadFileS3(e.file as File).then((res) => {
                    if (res) {
                        dispatch(setFileInDocumentiMaestranza({nome: e.nome, file: res.location}))
                    }
                });
            }
        })
    }

    useEffect(() => {
        if(maestranzaDaCreare.documenti.filter(d => !d.file || typeof d.file === 'string').length === Object.entries(maestranzaDaCreare.documenti).length){
            setUploadToFauna(true)
        }
    }, [maestranzaDaCreare])

    useEffect(() => {
        if(uploadToFauna){
            setSpinner(true)
            execQuery(createMaestranzaInFauna, {...maestranzaDaCreare, comunicazioni: comunicazioni, creatoDa: user?.email}).then(() => {
                dispatch(addMaestranza({
                    ...maestranzaDaCreare,
                    comunicazioni: comunicazioni,
                    creatoDa: user?.email as string
                }))
                dispatch(setMaestranzaDaCreare(maestranzaDefault))
                setSpinner(false)
                setObjectToCreate(undefined)
            })
        }
    }, [uploadToFauna])

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
                               defaultValue={maestranzaDaCreare.comunicazioni.telefono}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Cellulare privato: </span>
                    <div className="flex flex-col">
                        <input placeholder="Cellulare privato" {...register("cellularePrivato")}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.comunicazioni.cellularePrivato}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Cellulare aziendale: </span>
                    <div className="flex flex-col">
                        <input placeholder="Cellulare aziendale" {...register("cellulareAziendale")}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.comunicazioni.cellulareAziendale}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Indirizzo mail*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Indirizzo mail" {...register("email", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.comunicazioni.email}
                        />
                        {errors.email && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button type="submit"
                            className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                        Crea Maestranza
                    </button>

                </div>
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