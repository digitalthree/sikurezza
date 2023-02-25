import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cantiere} from "../model/Cantiere";
import {Impresa} from "../model/Impresa";

export type CantiereState = {
    cantieri: Cantiere[],
    cantiereSelezionato: Cantiere | undefined,
    cantieriProxy: Cantiere[]
    cantiereProxy: Cantiere | undefined
}

export const CantiereSlice = createSlice({
    name: 'cantieriSlice',
    initialState: {
        cantieri: [],
        cantieriProxy: [],
        cantiereSelezionato: undefined,
        cantiereProxy: undefined
    } as CantiereState,
    reducers: {
        addCantiere(state: CantiereState, action: PayloadAction<Cantiere>){
            state.cantieri.push(action.payload)
        },
        addCantiereProxy(state: CantiereState, action: PayloadAction<Cantiere>){
            state.cantieriProxy.push(action.payload)
        },
        selezionaCantiere(state: CantiereState, action: PayloadAction<Cantiere | undefined>){
            state.cantiereSelezionato = action.payload
        },
        selezionaCantiereProxy(state: CantiereState, action: PayloadAction<Cantiere | undefined>){
            state.cantiereProxy = action.payload
        },
        /*setImpresaAffidatariaOnCantiere(state: CantiereState, action: PayloadAction<{ cantiere: string, impresa: Impresa }>){
            let cantiereDaModificare = state.cantieri.filter(c => c.indirizzo === action.payload.cantiere)[0]
            cantiereDaModificare.impresaAffidataria = action.payload.impresa
            state.cantieri = state.cantieri.filter(c => c.faunaDocumentId !== cantiereDaModificare.faunaDocumentId)
            state.cantieri.push(cantiereDaModificare)
            state.cantiereSelezionato = cantiereDaModificare
        },
        setImpresaSubOnCantiere(state: CantiereState, action: PayloadAction<{ cantiere: string, impresa: Impresa }>){
            let cantiereDaModificare = state.cantieri.filter(c => c.indirizzo === action.payload.cantiere)[0]
            let indiceImpresaDaSostituire = cantiereDaModificare.impreseSubappaltatrici.indexOf(action.payload.impresa.faunaDocumentId as string)
            cantiereDaModificare.impreseSubappaltatrici[indiceImpresaDaSostituire] = action.payload.impresa
            state.cantieri = state.cantieri.filter(c => c.faunaDocumentId !== cantiereDaModificare.faunaDocumentId)
            state.cantieri.push(cantiereDaModificare)
            state.cantiereSelezionato = cantiereDaModificare
        },
        addImpresaSubOnCantiere(state: CantiereState, action: PayloadAction<{idCantiere: string, impresa: string}>){
            state.cantieri.forEach(c => {
                if(c.faunaDocumentId === action.payload.idCantiere){
                    c.impreseSubappaltatrici.push(action.payload.impresa)
                    state.cantiereSelezionato = c
                }
            })
            state.cantieriProxy.forEach(c => {
                if(c.faunaDocumentId === action.payload.idCantiere){
                    c.impreseSubappaltatrici.push(action.payload.impresa)
                    state.cantiereProxy = c
                }
            })
        }*/
    }
})


export const {
    addCantiere, addCantiereProxy, selezionaCantiere, selezionaCantiereProxy
} = CantiereSlice.actions

export const CantieriSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantieri;
export const CantieriProxySelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantieriProxy;
export const CantiereSelezionatoSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantiereSelezionato;
export const CantiereProxySelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantiereProxy;

const findCantiereByIndirizzo = (cantieri: Cantiere[], indirizzo: string) => {
    return cantieri.filter(c => c.anagrafica.indirizzo === indirizzo)[0]
}

export const trovaCantiereByNomeAndIndirizzo = (cantieri:Cantiere[], cantiereSelezionato: string) => {
    let stringa = cantiereSelezionato.split("-")
    //return cantieri.filter(c => c.anagrafica.indirizzo === stringa[1] && c.anagrafica.civico.toString() === stringa[2] && c.comune === stringa[3])[0]
}