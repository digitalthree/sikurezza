import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Impresa, impresaTemporanea, ItemComunicazione} from "../model/Impresa";

export type ImpresaState = {
    imprese: Impresa[],
    impresaDaCreare: Impresa,
    impresaSelezionata?: Impresa,
    objectToCreate?: string,
    breadcrumbItems: (string|Impresa)[]
}

export const ImpresaSlice = createSlice({
    name: 'impresaSlice',
    initialState: {
        imprese: [],
        impresaDaCreare: impresaTemporanea,
        breadcrumbItems: ['Home']
    } as ImpresaState,
    reducers: {
        addImpresa(state: ImpresaState, action: PayloadAction<Impresa>){
            state.imprese.push(action.payload)
        },
        removeImpresa(state: ImpresaState, action: PayloadAction<Impresa>){
            state.imprese = state.imprese.filter(i => i.faunaDocumentId !== action.payload.faunaDocumentId)
        },
        setImpresaSelezionata(state: ImpresaState, action: PayloadAction<Impresa | undefined>){
            state.impresaSelezionata = action.payload
        },
        setImpresaDaCreare(state: ImpresaState, action: PayloadAction<Impresa>){
            state.impresaDaCreare = action.payload
        },
        setObjectToCreate(state: ImpresaState, action: PayloadAction<string|undefined>){
            state.objectToCreate = action.payload
        },
        addBreadcrumbItem(state: ImpresaState, action: PayloadAction<string|Impresa>){
          state.breadcrumbItems.push(action.payload)
        },
        removeBreadcrumbItem(state: ImpresaState){
            state.breadcrumbItems.pop()
        },
        resetBreadcrumbItems(state: ImpresaState){
            state.breadcrumbItems = ["Home"]
        },
        setTipologiaImpresa(state: ImpresaState, action: PayloadAction<"Subappaltatrice" | "Affidataria">){
            state.impresaDaCreare.tipo = action.payload
            if(state.impresaSelezionata){
                state.impresaSelezionata.tipo = action.payload
            }
        },
        setAttributoAnagraficaImpresa(state: ImpresaState, action: PayloadAction<{ label:string, value: string }>){
            state.impresaDaCreare.anagrafica.attr.forEach(a => {
                if(a.label === action.payload.label){
                    a.value = action.payload.value
                }
            })
            if(state.impresaSelezionata){
                state.impresaSelezionata.anagrafica.attr.forEach(a => {
                    if(a.label === action.payload.label){
                        a.value = action.payload.value
                    }
                })
            }
        },
        setPresenzaInDocumenti(state: ImpresaState, action: PayloadAction<{ id: number, value: boolean }>){
            state.impresaDaCreare.documentiIdoneitaImpresa.forEach((d, index) => {
                if(index === action.payload.id) d.presenza = action.payload.value
            })
            if(state.impresaSelezionata){
                state.impresaSelezionata.documentiIdoneitaImpresa.forEach((d, index) => {
                    if(index === action.payload.id) d.presenza = action.payload.value
                })
            }
        },
        setFileInDocumenti(state: ImpresaState, action: PayloadAction<{nome: string, file: {nome: string, value: string|File|undefined}}>){
            state.impresaDaCreare.documentiIdoneitaImpresa.forEach((d) => {
                if(d.nome === action.payload.nome) {
                    d.file = action.payload.file
                }
            })
            if(state.impresaSelezionata){
                state.impresaSelezionata.documentiIdoneitaImpresa.forEach((d) => {
                    if(d.nome === action.payload.nome) {
                        d.file = action.payload.file
                    }
                })
            }
        },
        setComunicazioneInComunicazioni(state: ImpresaState, action: PayloadAction<{mansione: string,  attributo: string, valore: string}>){
            state.impresaDaCreare.comunicazioni.forEach(c => {
                if(c.mansione === action.payload.mansione){
                    if (action.payload.attributo === 'nome') c.nome = action.payload.valore
                    if (action.payload.attributo === 'email') c.email = action.payload.valore
                    if (action.payload.attributo === 'telefono') c.telefono = action.payload.valore
                }
            })
            if(state.impresaSelezionata){
                state.impresaSelezionata.comunicazioni.forEach(c => {
                    if(c.mansione === action.payload.mansione){
                        if (action.payload.attributo === 'nome') c.nome = action.payload.valore
                        if (action.payload.attributo === 'email') c.email = action.payload.valore
                        if (action.payload.attributo === 'telefono') c.telefono = action.payload.valore
                    }
                })
            }
        },
        addComunicazioneInComunicazioni(state: ImpresaState, action: PayloadAction<ItemComunicazione>){
            state.impresaDaCreare.comunicazioni.push(action.payload)
            if(state.impresaSelezionata){
                state.impresaSelezionata.comunicazioni.push(action.payload)
            }
        },
        addMaestranza(state: ImpresaState, action: PayloadAction<{impresa: string, maestranza: string}>){
            state.imprese.filter(i => i.faunaDocumentId === action.payload.impresa)[0].maestranze.push(action.payload.maestranza);
            (state.impresaSelezionata) && state.impresaSelezionata.maestranze.push(action.payload.maestranza)
        },
        removeMaestranza(state: ImpresaState, action: PayloadAction<{impresa: string, maestranza: string}>){
            state.imprese.filter(i => i.faunaDocumentId === action.payload.impresa)[0].maestranze = state.imprese.filter(i => i.faunaDocumentId === action.payload.impresa)[0].maestranze.filter(m => m !== action.payload.maestranza);
            if(state.impresaSelezionata){
                state.impresaSelezionata.maestranze = state.impresaSelezionata.maestranze.filter(m => m !== action.payload.maestranza);
            }

        },
    }
})


export const {
    addImpresa, removeImpresa, setImpresaDaCreare, setPresenzaInDocumenti, setFileInDocumenti, setComunicazioneInComunicazioni,
    setImpresaSelezionata, addComunicazioneInComunicazioni, addMaestranza, removeMaestranza, setObjectToCreate, addBreadcrumbItem,
    removeBreadcrumbItem, resetBreadcrumbItems, setTipologiaImpresa, setAttributoAnagraficaImpresa
} = ImpresaSlice.actions

export const ImpreseSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.imprese;
export const ImpresaSelezionataSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.impresaSelezionata;
export const ImpreseDaCreareSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.impresaDaCreare;
export const ObjectToCreateSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.objectToCreate;
export const BreadcrumbItemsSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.breadcrumbItems;

