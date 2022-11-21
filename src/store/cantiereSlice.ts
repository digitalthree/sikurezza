import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cantiere} from "../model/Cantiere";
import {Impresa} from "../model/Impresa";

export type CantiereState = {
    cantieri: Cantiere[],
    cantiereSelezionato: Cantiere | undefined
}

export const CantiereSlice = createSlice({
    name: 'cantieriSlice',
    initialState: {
        cantieri: [],
        cantiereSelezionato: undefined
    } as CantiereState,
    reducers: {
        addCantiere(state: CantiereState, action: PayloadAction<Cantiere>){
            state.cantieri.push(action.payload)
        },
        selezionaCantiere(state: CantiereState, action: PayloadAction<Cantiere | undefined>){
            state.cantiereSelezionato = action.payload
        },
        setImpresaAffidatariaOnCantiere(state: CantiereState, action: PayloadAction<{ cantiere: string, impresa: Impresa }>){
            if(!state.cantiereSelezionato) state.cantiereSelezionato = findCantiereByIndirizzo(state.cantieri, action.payload.cantiere)
            state.cantiereSelezionato.impresaAffidataria = action.payload.impresa
        }
    }
})


export const {
    addCantiere, selezionaCantiere, setImpresaAffidatariaOnCantiere
} = CantiereSlice.actions

export const CantieriSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantieri;
export const CantiereSelezionatoSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantiereSelezionato;

const findCantiereByIndirizzo = (cantieri: Cantiere[], indirizzo: string) => {
    return cantieri.filter(c => c.indirizzo === indirizzo)[0]
}

export const trovaCantiereByNomeAndIndirizzo = (cantieri:Cantiere[], cantiereSelezionato: string) => {
    let stringa = cantiereSelezionato.split("-")
    return cantieri.filter(c => c.indirizzo === stringa[1] && c.civico.toString() === stringa[2] && c.comune === stringa[3])[0]
}