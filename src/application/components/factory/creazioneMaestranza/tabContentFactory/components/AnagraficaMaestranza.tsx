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
import {
    addBreadcrumbItem,
    BreadcrumbItemsSelector,
    ImpresaSelezionataSelector
} from "../../../../../../store/impresaSlice";

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
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const breadcrumbItems = useSelector(BreadcrumbItemsSelector)

    useEffect(() => {
        dispatch(setAnagraficaMaestranza({label: 'impresaAppartenenza', value: impresaSelezionata?.anagrafica.attr.filter(a => a.label === "denominazione")[0].value as string}))
    }, [impresaSelezionata])


    useEffect(() => {
        if(maestranzaSelezionata && breadcrumbItems.filter(bi => bi === `${maestranzaSelezionata.anagrafica.filter(a => a.label === "nome")[0].value} ${maestranzaSelezionata.anagrafica.filter(a => a.label === "cognome")[0].value}`).length === 0){
            dispatch(addBreadcrumbItem(`${maestranzaSelezionata.anagrafica.filter(a => a.label === "nome")[0].value} ${maestranzaSelezionata.anagrafica.filter(a => a.label === "cognome")[0].value}`))
        }
    }, [maestranzaSelezionata])



    const {register,  formState: {errors}} = useForm();



    return (
        <>
            <form className="w-[40%] p-10 shadow-2xl">
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
                               value={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.filter(m => m.label === 'nome')[0].value as string : maestranzaDaCreare.anagrafica.filter(m => m.label === 'nome')[0].value as string}
                               onChange={(e) => dispatch(setAnagraficaMaestranza({label: 'nome', value: e.target.value}))}
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
                               value={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.filter(m => m.label === 'cognome')[0].value as string : maestranzaDaCreare.anagrafica.filter(m => m.label === 'cognome')[0].value as string}
                               onChange={(e) => dispatch(setAnagraficaMaestranza({label: 'cognome', value: e.target.value}))}
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
                               value={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.filter(m => m.label === 'dataNascita')[0].value as string : maestranzaDaCreare.anagrafica.filter(m => m.label === 'dataNascita')[0].value as string}
                               onChange={(e) => dispatch(setAnagraficaMaestranza({label: 'dataNascita', value: e.target.value}))}
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
                               value={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.filter(m => m.label === 'luogoNascita')[0].value as string : maestranzaDaCreare.anagrafica.filter(m => m.label === 'luogoNascita')[0].value as string}
                               onChange={(e) => dispatch(setAnagraficaMaestranza({label: 'luogoNascita', value: e.target.value}))}
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
                               value={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.filter(m => m.label === 'codiceFiscale')[0].value as string : maestranzaDaCreare.anagrafica.filter(m => m.label === 'codiceFiscale')[0].value as string}
                               onChange={(e) => dispatch(setAnagraficaMaestranza({label: 'codiceFiscale', value: e.target.value}))}
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
                               value={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.filter(m => m.label === 'impresaAppartenenza')[0].value as string : impresaSelezionata?.anagrafica.attr.filter(a => a.label === "denominazione")[0].value}
                        />
                        {errors.impresaAppartenenza && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Datore di lavoro: </span>
                    <div className="flex flex-row items-center">
                        NO
                        <input type="checkbox" className="toggle ml-2 mr-2" {...register("datoreLavoro")}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               checked={(maestranzaSelezionata) ? maestranzaSelezionata.anagrafica.filter(m => m.label === 'datoreLavoro')[0].value as boolean : maestranzaDaCreare.anagrafica.filter(m => m.label === 'datoreLavoro')[0].value as boolean}
                               onChange={(e) => dispatch(setAnagraficaMaestranza({label: 'datoreLavoro', value: e.target.checked}))}
                        />
                        SI
                    </div>
                </div>

                {editabile  &&
                    <div className="flex mt-10">
                        <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                            <TfiSave size="30px" className="text-white"/>
                        </div>
                        <button onClick={() => setTabActive("Documenti")}
                            className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                            Salva e Prosegui
                        </button>

                    </div>
                }
            </form>
        </>
    )
}

export default AnagraficaMaestranza