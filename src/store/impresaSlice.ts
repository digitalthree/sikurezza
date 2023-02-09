import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Impresa, impresaTemporanea, ItemComunicazione} from "../model/Impresa";

export type ImpresaState = {
    imprese: Impresa[],
    impresaDaCreare: Impresa,
    impresaSelezionata?: Impresa
}

export const ImpresaSlice = createSlice({
    name: 'impresaSlice',
    initialState: {
        imprese: [],
        impresaDaCreare: impresaTemporanea
    } as ImpresaState,
    reducers: {
        addImpresa(state: ImpresaState, action: PayloadAction<Impresa>){
            state.imprese.push(action.payload)
        },
        setImpresaSelezionata(state: ImpresaState, action: PayloadAction<Impresa | undefined>){
            state.impresaSelezionata = action.payload
        },
        setImpresaDaCreare(state: ImpresaState, action: PayloadAction<Impresa>){
            state.impresaDaCreare = action.payload
        },
        setTipologiaImpresa(state: ImpresaState, action: PayloadAction<"Subappaltatrice" | "Affidataria">){
            state.impresaDaCreare.tipo = action.payload
        },
        setPresenzaInDocumenti(state: ImpresaState, action: PayloadAction<{ id: number, value: boolean }>){
            state.impresaDaCreare.documentiIdoneitaImpresa.forEach((d, index) => {
                if(index === action.payload.id) d.presenza = action.payload.value
            })
        },
        setFileInDocumenti(state: ImpresaState, action: PayloadAction<{nome: string, file: {nome: string, value: string|File}}>){
            state.impresaDaCreare.documentiIdoneitaImpresa.forEach((d) => {
                if(d.nome === action.payload.nome) {
                    d.file = action.payload.file
                }
            })
        },
        setComunicazioneInComunicazioni(state: ImpresaState, action: PayloadAction<{mansione: string,  attributo: string, valore: string}>){
            state.impresaDaCreare.comunicazioni.forEach(c => {
                if(c.mansione === action.payload.mansione){
                    if (action.payload.attributo === 'nome') c.nome = action.payload.valore
                    if (action.payload.attributo === 'email') c.email = action.payload.valore
                    if (action.payload.attributo === 'telefono') c.telefono = action.payload.valore
                }
            })
        },
        addComunicazioneInComunicazioni(state: ImpresaState, action: PayloadAction<ItemComunicazione>){
            state.impresaDaCreare.comunicazioni.push(action.payload)
        }
    }
})


export const {
    addImpresa, setImpresaDaCreare, setPresenzaInDocumenti, setFileInDocumenti, setComunicazioneInComunicazioni,
    setImpresaSelezionata, addComunicazioneInComunicazioni
} = ImpresaSlice.actions

export const ImpreseSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.imprese;
export const ImpresaSelezionataSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.impresaSelezionata;
export const ImpreseDaCreareSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.impresaDaCreare;

