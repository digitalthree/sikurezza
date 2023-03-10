import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {
    ImpresaSelezionataSelector,
    ImpreseDaCreareSelector,
    setImpresaDaCreare
} from "../../../../../../store/impresaSlice";

interface AnagraficaProps {
    setTabActive: (s:string) => void,
    primoAccesso: boolean
}

export const AnagraficaImpresa: React.FC<AnagraficaProps> = ({setTabActive, primoAccesso}) => {

    const dispatch = useDispatch()
    const impresaDaCreare = useSelector(ImpreseDaCreareSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    useEffect(() => {
        if(impresaSelezionata){
            dispatch(setImpresaDaCreare(impresaSelezionata))
        }
    }, [impresaSelezionata])

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data: any) => {
        console.log(data)
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
                                defaultValue={(impresaSelezionata) ? impresaSelezionata.tipo : "Subappaltatrice"}
                                value={(impresaSelezionata) ? impresaSelezionata.tipo : "Subappaltatrice"}
                        >
                            <option disabled={!primoAccesso}>Affidataria</option>
                            <option disabled={primoAccesso}>Subappaltatrice</option>
                        </select>
                        {errors.denominazione && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Denominazione*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Denominazione" {...register("denominazione", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.denominazione :impresaDaCreare.anagrafica.denominazione}
                        />
                        {errors.denominazione && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>


                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Sede Legale*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Sede Legale" {...register("sedeLegale", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.sedeLegale :impresaDaCreare.anagrafica.sedeLegale}
                        />
                        {errors.sedeLegale && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice Fiscale: </span>
                    <input {...register("codiceFiscale")}
                           className="rounded border border-gray-400 shadow p-1 w-[262px]"
                           defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.codiceFiscale :impresaDaCreare.anagrafica.codiceFiscale}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">P. Iva </span>
                    <input {...register("partitaIva")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.partitaIva :impresaDaCreare.anagrafica.partitaIva}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Forma Giuridica: </span>
                    <input {...register("formaGiuridica")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.formaGiuridica :impresaDaCreare.anagrafica.formaGiuridica}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Amministratore: </span>
                    <input {...register("amministratore")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.amministratore :impresaDaCreare.anagrafica.amministratore}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice fiscale Amministratore: </span>
                    <input {...register("codiceFiscaleAmministratore")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.codiceFiscaleAmministratore :impresaDaCreare.anagrafica.codiceFiscaleAmministratore}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">DURC: </span>
                        <input type="date" {...register("durc")}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.durc :impresaDaCreare.anagrafica.durc}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">scadenza: </span>
                        <input type="date" {...register("scadenza")}
                               className="rounded border border-gray-400 shadow p-1"
                               defaultValue={(impresaSelezionata) ? impresaSelezionata.anagrafica.scadenza :impresaDaCreare.anagrafica.scadenza}
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