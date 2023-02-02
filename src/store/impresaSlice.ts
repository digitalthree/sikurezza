import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Impresa, impresaTemporanea} from "../model/Impresa";

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
        setFileInDocumenti(state: ImpresaState, action: PayloadAction<{nome: string, file: string|File}>){
            state.impresaDaCreare.documentiIdoneitaImpresa.forEach((d) => {
                if(d.nome === action.payload.nome) {
                    d.file = action.payload.file
                }
            })
        }
    }
})


export const {
    addImpresa, setImpresaDaCreare, setPresenzaInDocumenti, setFileInDocumenti, setTipologiaImpresa, setImpresaSelezionata
} = ImpresaSlice.actions

export const ImpreseSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.imprese;
export const ImpresaSelezionataSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.impresaSelezionata;
export const ImpreseDaCreareSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.impresaDaCreare;
