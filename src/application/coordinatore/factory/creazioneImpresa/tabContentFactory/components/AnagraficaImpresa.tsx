import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {ImpreseDaCreareSelector, setImpresaDaCreare} from "../../../../../../store/impresaSlice";
import {CantiereSelezionatoSelector} from "../../../../../../store/cantiereSlice";

interface AnagraficaProps {
    setTabActive: (s:string) => void
}

export const AnagraficaImpresa: React.FC<AnagraficaProps> = ({setTabActive}) => {

    const dispatch = useDispatch()
    const impresaDaCreare = useSelector(ImpreseDaCreareSelector)
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data: any) => {
        dispatch(setImpresaDaCreare({...impresaDaCreare, anagrafica: data, tipo: data.tipologiaImpresa}))
        setTabActive("Documenti")
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-20 w-[40%] p-10 shadow-2xl">

                <div className="flex justify-between items-center">
                    <span className="font-bold">Tipologia Impresa*: </span>
                    <div className="flex flex-col">
                        <select placeholder="Tipologia Impresa" {...register("tipologiaImpresa", {required: true})}
                                className="rounded border border-gray-400 shadow p-1"
                                defaultValue={(cantiereSelezionato) ? "Subappaltatrice" : "Affidataria"}
                        >
                            <option>Affidataria</option>
                            <option>Subappaltatrice</option>
                        </select>
                        {errors.denominazione && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Denominazione*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Denominazione" {...register("denominazione", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={impresaDaCreare.anagrafica.denominazione}
                        />
                        {errors.denominazione && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>


                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Sede Legale*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Sede Legale" {...register("sedeLegale", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={impresaDaCreare.anagrafica.sedeLegale}
                        />
                        {errors.sedeLegale && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice Fiscale: </span>
                    <input {...register("codiceFiscale")}
                           className="rounded border border-gray-400 shadow p-1 w-[262px]"
                           defaultValue={impresaDaCreare.anagrafica.codiceFiscale}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">P. Iva </span>
                    <input {...register("partitaIva")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.anagrafica.partitaIva}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Forma Giuridica: </span>
                    <input {...register("formaGiuridica")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.anagrafica.formaGiuridica}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Amministratore: </span>
                    <input {...register("amministratore")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.anagrafica.amministratore}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice fiscale Amministratore: </span>
                    <input {...register("codiceFiscaleAmministratore")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.anagrafica.codiceFiscaleAmministratore}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">DURC: </span>
                        <input type="date" {...register("durc")}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={impresaDaCreare.anagrafica.durc}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">scadenza: </span>
                        <input type="date" {...register("scadenza")}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={impresaDaCreare.anagrafica.scadenza}
                        />
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