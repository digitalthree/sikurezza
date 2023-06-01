import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setAnagraficaMaestranza, setMaestranzaDaCreare
} from "../../../../../../store/maestranzaSlice";
import {Impresa} from "../../../../../../model/Impresa";
import {estintoreDefault} from "../../../../../../model/Estintore";
import {maestranzaDefault} from "../../../../../../model/Maestranza";

export interface AnagraficaMaestranzaProps{
    setTabActive: (s:string) => void
    editabile: boolean,
}

const AnagraficaMaestranza: React.FC<AnagraficaMaestranzaProps> = (
    {
        setTabActive, editabile
    }
) => {
    const dispatch = useDispatch()
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)



    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const onSubmit = (data: any) => {
        dispatch(setAnagraficaMaestranza(data))
        setTabActive("Documenti")
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-20 w-[40%] p-10 shadow-2xl">

                <div className="flex justify-between items-center">
                    <span className="font-bold">Nome*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Nome" {...register("nome", {required: true})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               defaultValue={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.nome : maestranzaDaCreare.anagrafica.nome}
                        />
                        {errors.nome && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Cognome*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Cognome" {...register("cognome", {required: true})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               defaultValue={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.cognome : maestranzaDaCreare.anagrafica.cognome}
                        />
                        {errors.cognome && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Data Di Nascita*: </span>
                    <div className="flex flex-col">
                        <input type="date" {...register("dataNascita")}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               defaultValue={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.dataNascita : maestranzaDaCreare.anagrafica.dataNascita}
                        />
                        {errors.dataNascita && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Luogo di Nascita*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Luogo di Nascita" {...register("luogoNascita", {required: true})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               defaultValue={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.luogoNascita : maestranzaDaCreare.anagrafica.luogoNascita}
                        />
                        {errors.luogoNascita && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice Fiscale*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Codice Fiscale" {...register("codiceFiscale", {required: true})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               defaultValue={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.codiceFiscale : maestranzaDaCreare.anagrafica.codiceFiscale}
                        />
                        {errors.codiceFiscale && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Impresa di appartenenza*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Impresa di appartenenza" {...register("impresaAppartenenza", {required: true})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               defaultValue={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.impresaAppartenenza : maestranzaDaCreare.anagrafica.impresaAppartenenza}
                        />
                        {errors.impresaAppartenenza && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Datore di lavoro: </span>
                    <div className="flex flex-col">
                        <input type="checkbox" className="toggle toggle-sm" {...register("datoreLavoro")}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               defaultChecked={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.datoreLavoro : maestranzaDaCreare.anagrafica.datoreLavoro}
                        />
                    </div>
                </div>

                {editabile  &&
                    <div className="flex mt-10">
                        <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                            <TfiSave size="30px" className="text-white"/>
                        </div>
                        <button type="submit" className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                            Salva e Prosegui
                        </button>

                    </div>
                }
            </form>
        </>
    )
}

export default AnagraficaMaestranza