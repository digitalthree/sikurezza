import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {MaestranzaDaCreareSelector, setAnagraficaMaestranza} from "../../../../../../store/maestranzaSlice";

export interface AnagraficaMaestranzaProps{
    setTabActive: (s:string) => void
}

const AnagraficaMaestranza: React.FC<AnagraficaMaestranzaProps> = (
    {
        setTabActive
    }
) => {
    const dispatch = useDispatch()
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)

    const {register, handleSubmit, formState: {errors}} = useForm();
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
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.anagrafica.nome}
                        />
                        {errors.nome && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Cognome*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Cognome" {...register("cognome", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.anagrafica.cognome}
                        />
                        {errors.cognome && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Data Di Nascita*: </span>
                    <div className="flex flex-col">
                        <input type="date" {...register("dataNascita")}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.anagrafica.dataNascita}
                        />
                        {errors.dataNascita && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Luogo di Nascita*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Luogo di Nascita" {...register("luogoNascita", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.anagrafica.luogoNascita}
                        />
                        {errors.luogoNascita && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice Fiscale*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Codice Fiscale" {...register("codiceFiscale", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.anagrafica.codiceFiscale}
                        />
                        {errors.codiceFiscale && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Impresa di appartenenza*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Impresa di appartenenza" {...register("impresaAppartenenza", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={maestranzaDaCreare.anagrafica.impresaAppartenenza}
                        />
                        {errors.impresaAppartenenza && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Datore di lavoro: </span>
                    <div className="flex flex-col">
                        <input type="checkbox" className="toggle toggle-sm" {...register("datoreLavoro")}
                            defaultChecked={maestranzaDaCreare.anagrafica.datoreLavoro}/>
                    </div>
                </div>

                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button type="submit" className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                        Salva e Prosegui
                    </button>

                </div>
            </form>
        </>
    )
}

export default AnagraficaMaestranza