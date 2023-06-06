import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {
    ImpresaSelezionataSelector,
    ImpreseDaCreareSelector, setAttributoAnagraficaImpresa,
    setImpresaDaCreare, setLogoImpresa, setTipologiaImpresa
} from "../../../../../../store/impresaSlice";
import {Impresa, impresaTemporanea} from "../../../../../../model/Impresa";
import VisualizzaEliminaFile from "../../../../../../shared/Files/VisualizzaEliminaFile";
import {setFileInDocumentiMaestranza} from "../../../../../../store/maestranzaSlice";
import InputFile from "../../../../../../shared/Files/InputFile";
import {deleteFileS3, uploadFileS3} from "../../../../../../aws/s3APIs";

interface AnagraficaProps {
    setTabActive: (s:string) => void,
    primoAccesso: boolean
}

export const AnagraficaImpresa: React.FC<AnagraficaProps> = ({setTabActive, primoAccesso}) => {

    const dispatch = useDispatch()
    const impresaDaCreare = useSelector(ImpreseDaCreareSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const [impresa, setImpresa] = useState<Impresa>(impresaTemporanea)

    useEffect(() => {
        if(impresaSelezionata){
            dispatch(setImpresaDaCreare(impresaSelezionata))
            setImpresa(impresaSelezionata)
        }else{
            dispatch(setTipologiaImpresa("Subappaltatrice"))
            setImpresa(impresaDaCreare)
        }
    }, [impresaSelezionata, impresaDaCreare])

    const {register, formState: {errors}} = useForm();



    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="w-[40%] p-10 shadow-2xl">

                <div className="flex justify-between items-center">
                    <span className="font-bold">Tipologia Impresa*: </span>
                    <div className="flex flex-col">
                        <select placeholder="Tipologia Impresa" {...register("tipologiaImpresa", {required: true})}
                                className="rounded border border-gray-400 shadow p-1"
                                disabled={!primoAccesso}
                                value={(impresa) ? impresa.tipo : "Subappaltatrice"}
                                onChange={(e) => {
                                    if(e.target.value === "Affidataria"){
                                        dispatch(setTipologiaImpresa(e.target.value as "Affidataria"))
                                    }else{
                                        dispatch(setTipologiaImpresa(e.target.value as "Subappaltatrice"))
                                    }
                                }}
                        >
                            <option value="Affidataria">Affidataria</option>
                            <option value="Subappaltatrice">Subappaltatrice</option>
                        </select>
                        {errors.denominazione && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Logo: </span>
                    {impresa.anagrafica.logo.value ?
                        <VisualizzaEliminaFile file={impresa.anagrafica.logo.value} modifica={true} nome="logo"
                                               eliminaFunction={() => {
                                                   if(typeof impresa.anagrafica.logo.value === "string"){
                                                       deleteFileS3(impresa.anagrafica.logo.value).then(() => dispatch(setLogoImpresa(undefined)))
                                                   }else{
                                                       dispatch(setLogoImpresa(undefined))
                                                   }
                                               }}
                        />
                        :
                        <InputFile editabile={true} accept="image" onChangeFunction={(e) => {
                            dispatch(setLogoImpresa((e.target.files) ? e.target.files[0] : undefined))
                        }}/>
                    }
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Denominazione*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Denominazione" {...register("denominazione", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}
                               onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'denominazione', value: e.target.value}))}
                        />
                        {errors.denominazione && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>


                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Sede Legale*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Sede Legale" {...register("sedeLegale", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'sedeLegale')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'sedeLegale')[0].value}
                               onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'sedeLegale', value: e.target.value}))}
                        />
                        {errors.sedeLegale && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice Fiscale: </span>
                    <input {...register("codiceFiscale")}
                           className="rounded border border-gray-400 shadow p-1 w-[262px]"
                           onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                           value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'codiceFiscale')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'codiceFiscale')[0].value}
                           onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'codiceFiscale', value: e.target.value}))}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">P. Iva </span>
                    <input {...register("partitaIva")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                           value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'partitaIva')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'partitaIva')[0].value}
                           onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'partitaIva', value: e.target.value}))}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Forma Giuridica: </span>
                    <input {...register("formaGiuridica")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                           value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'formaGiuridica')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'formaGiuridica')[0].value}
                           onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'formaGiuridica', value: e.target.value}))}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Amministratore: </span>
                    <input {...register("amministratore")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                           value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'amministratore')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'amministratore')[0].value}
                           onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'amministratore', value: e.target.value}))}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice fiscale Amministratore: </span>
                    <input {...register("codiceFiscaleAmministratore")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                           value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'codiceFiscaleAmministratore')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'codiceFiscaleAmministratore')[0].value}
                           onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'codiceFiscaleAmministratore', value: e.target.value}))}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">DURC: </span>
                        <input type="date" {...register("durc")}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'durc')[0].value :impresaDaCreare.anagrafica.attr.filter(a => a.label === 'durc')[0].value}
                               onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'durc', value: e.target.value}))}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">scadenza: </span>
                        <input type="date" {...register("scadenza")}
                               className="rounded border border-gray-400 shadow p-1"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               value={(impresa) ? impresa.anagrafica.attr.filter(a => a.label === 'scadenza')[0].value : impresaDaCreare.anagrafica.attr.filter(a => a.label === 'scadenza')[0].value}
                               onChange={(e) => dispatch(setAttributoAnagraficaImpresa({label: 'scadenza', value: e.target.value}))}
                        />
                    </div>
                </div>

                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                            onClick={(e) => {
                                e.preventDefault()
                                console.log('qui')
                                setTabActive("Documenti")
                            }}
                    >
                        Salva e Prosegui
                    </button>
                </div>
            </form>
        </>
    )

}