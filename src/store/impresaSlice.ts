import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Impresa, impresaTemporanea} from "../model/Impresa";

export type ImpresaState = {
    imprese: Impresa[],
    impresaDaCreare: Impresa
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
        setFileInDocumenti(state: ImpresaState, action: PayloadAction<{id: number, name: string, value: string}>){
            state.impresaDaCreare.documentiIdoneitaImpresa.forEach((d, index) => {
                if(index === action.payload.id) {
                    d.file.name = action.payload.name
                    d.file.value = action.payload.value
                }
            })
        }
    }
})


export const {
    addImpresa, setImpresaDaCreare, setPresenzaInDocumenti, setFileInDocumenti, setTipologiaImpresa
} = ImpresaSlice.actions

export const ImpreseSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.imprese;
export const ImpreseDaCreareSelector = (state: { impresaSlice: ImpresaState }) => state.impresaSlice.impresaDaCreare;
