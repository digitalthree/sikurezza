import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setAnagraficaMaestranza} from "../../../../../../store/maestranzaSlice";
import {
    addBreadcrumbItem,
    BreadcrumbItemsSelector,
    ImpresaSelezionataSelector
} from "../../../../../../store/impresaSlice";

// Funzione ausiliaria per estrarre un valore dall'array di anagrafica
const getAnagraficaValue = (anagraficaArray: any, label: string, defaultValue: any = '') => {
    const item = anagraficaArray?.filter((a: any) => a.label === label)[0];
    // Gestisci valori booleani correttamente
    if (typeof item?.value === 'boolean') return item.value;
    return item?.value ?? defaultValue;
};

export interface AnagraficaMaestranzaProps{
    setTabActive: (s:string) => void;
    editabile: boolean;
    setmodificaEffettuata?: Function;
}

const AnagraficaMaestranza: React.FC<AnagraficaMaestranzaProps> = (
    {
        setTabActive, editabile, setmodificaEffettuata
    }
) => {
    const dispatch = useDispatch()
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const breadcrumbItems = useSelector(BreadcrumbItemsSelector)
    
    // Prepara i dati iniziali
    const currentAnagrafica = maestranzaSelezionata?.anagrafica || maestranzaDaCreare.anagrafica;
    
    // Memoizzazione dei default values
    const defaultValues = useMemo(() => {
        return {
            nome: getAnagraficaValue(currentAnagrafica, 'nome'),
            cognome: getAnagraficaValue(currentAnagrafica, 'cognome'),
            dataNascita: getAnagraficaValue(currentAnagrafica, 'dataNascita'),
            luogoNascita: getAnagraficaValue(currentAnagrafica, 'luogoNascita'),
            codiceFiscale: getAnagraficaValue(currentAnagrafica, 'codiceFiscale'),
            impresaAppartenenza: maestranzaSelezionata 
                ? getAnagraficaValue(currentAnagrafica, 'impresaAppartenenza')
                : impresaSelezionata?.anagrafica.attr.filter(a => a.label === "denominazione")[0].value,
            datoreLavoro: getAnagraficaValue(currentAnagrafica, 'datoreLavoro', false),
        };
    }, [maestranzaSelezionata, maestranzaDaCreare, impresaSelezionata]);

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        defaultValues: defaultValues 
    });

    // 1. Aggiorna il form quando cambiano i dati iniziali
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    // 2. Gestione Logica Immagine/Breadcrumb (come era prima)
    useEffect(() => {
        // Logica per aggiornare l'impresa di appartenenza solo se stiamo creando una nuova maestranza
        if (!maestranzaSelezionata && impresaSelezionata) {
            dispatch(setAnagraficaMaestranza({
                label: 'impresaAppartenenza', 
                value: impresaSelezionata.anagrafica.attr.filter(a => a.label === "denominazione")[0].value as string
            }));
        }
    }, [impresaSelezionata, maestranzaSelezionata, dispatch])

    useEffect(() => {
        if(maestranzaSelezionata && !setmodificaEffettuata && breadcrumbItems.filter(bi => bi === `${getAnagraficaValue(maestranzaSelezionata.anagrafica, 'nome')} ${getAnagraficaValue(maestranzaSelezionata.anagrafica, 'cognome')}`).length === 0){
            dispatch(addBreadcrumbItem(`${getAnagraficaValue(maestranzaSelezionata.anagrafica, 'nome')} ${getAnagraficaValue(maestranzaSelezionata.anagrafica, 'cognome')}`))
        }
    }, [maestranzaSelezionata, breadcrumbItems, dispatch])
    
    
    // Funzione chiamata DA RHF dopo una validazione con successo
    const onSubmit = (data: typeof defaultValues) => {
        // Mappa e invia i dati a Redux
        Object.entries(data).forEach(([key, value]) => {
            dispatch(setAnagraficaMaestranza({label: key, value: value}));
        });
        
        // Prosegui solo dopo il successo della validazione
        setTabActive("Documenti");
    };


    return (
        <>
            {/* L'azione del submit va gestita da handleSubmit */}
            <form className="xl:w-[40%] w-full p-10 shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
                
                {/* NOME (Obbligatorio) */}
                <div className="flex justify-between items-center">
                    <span className="font-bold">Nome*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Nome" 
                               {...register("nome", {required: "Campo obbligatorio"})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                        />
                        {errors.nome && <span className="font-bold text-red-600">{errors.nome.message as string}</span>}
                    </div>
                </div>

                {/* COGNOME (Obbligatorio) */}
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Cognome*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Cognome" 
                               {...register("cognome", {required: "Campo obbligatorio"})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                        />
                        {errors.cognome && <span className="font-bold text-red-600">{errors.cognome.message as string}</span>}
                    </div>
                </div>

                {/* DATA DI NASCITA (Obbligatorio) */}
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Data Di Nascita*: </span>
                    <div className="flex flex-col">
                        <input type="date" 
                               {...register("dataNascita", {required: "Campo obbligatorio"})} // <--- ORA OBBLIGATORIO
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                        />
                        {errors.dataNascita && <span className="font-bold text-red-600">{errors.dataNascita.message as string}</span>}
                    </div>
                </div>

                {/* LUOGO DI NASCITA (Obbligatorio) */}
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Luogo di Nascita*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Luogo di Nascita" 
                               {...register("luogoNascita", {required: "Campo obbligatorio"})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                        />
                        {errors.luogoNascita && <span className="font-bold text-red-600">{errors.luogoNascita.message as string}</span>}
                    </div>
                </div>

                {/* CODICE FISCALE (Obbligatorio) */}
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Codice Fiscale*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Codice Fiscale" 
                               {...register("codiceFiscale", {required: "Campo obbligatorio"})}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                        />
                        {errors.codiceFiscale && <span className="font-bold text-red-600">{errors.codiceFiscale.message as string}</span>}
                    </div>
                </div>

                {/* IMPRESA APPARTENENZA (Gestito da Redux, reso readOnly) */}
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Impresa di appartenenza: </span>
                    <div className="flex flex-col">
                        <input placeholder="Impresa di appartenenza" 
                               {...register("impresaAppartenenza")}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               className="rounded border border-gray-400 shadow p-1"
                               disabled={!editabile}
                               readOnly // Importante: evita che l'utente modifichi il campo
                        />
                    </div>
                </div>

                {/* DATORE DI LAVORO (Checkbox) */}
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Datore di lavoro: </span>
                    <div className="flex flex-row items-center">
                        NO
                        <input type="checkbox" className="toggle ml-2 mr-2" 
                               {...register("datoreLavoro")} // RHF gestisce il valore booleano
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                        />
                        SI
                    </div>
                </div>

                {/* PULSANTE SUBMIT */}
                {editabile  &&
                    <div className="flex mt-10">
                        <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                            <TfiSave size="30px" className="text-white"/>
                        </div>
                        {/* Il pulsante DEVE essere di tipo submit e DEVE essere dentro il form */}
                        <button type="submit" 
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