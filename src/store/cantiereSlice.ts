import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cantiere, cantiereDefault} from "../model/Cantiere";
import {Impresa} from "../model/Impresa";

export type CantiereState = {
    cantieri: Cantiere[],
    cantiereSelezionato: Cantiere | undefined,
    cantiereDaCreare: Cantiere
}

export const CantiereSlice = createSlice({
    name: 'cantieriSlice',
    initialState: {
        cantieri: [],
        cantiereSelezionato: undefined,
        cantiereDaCreare: cantiereDefault
    } as CantiereState,
    reducers: {
        addCantiere(state: CantiereState, action: PayloadAction<Cantiere>){
            state.cantieri.push(action.payload)
        },
        removeCantiere(state: CantiereState, action: PayloadAction<string>){
            state.cantieri = state.cantieri.filter(c => c.faunaDocumentId === action.payload)
        },
        selezionaCantiere(state: CantiereState, action: PayloadAction<Cantiere | undefined>){
            state.cantiereSelezionato = action.payload
        },
        resetCantieri(state: CantiereState){
            state.cantieri = []
        },
        setCantiereDaCreare(state: CantiereState, action: PayloadAction<Cantiere>){
            state.cantiereDaCreare = action.payload
        },
        setAttributoAnagrafica(state: CantiereState, action: PayloadAction<{nome: string, value: string}>){
            state.cantiereDaCreare.anagrafica.attr.forEach(a => {
                if(a.nome === action.payload.nome){
                    a.value = action.payload.value
                }
            })
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.anagrafica.attr.forEach(a => {
                    if(a.nome === action.payload.nome){
                        a.value = action.payload.value
                    }
                })
            }
        }
    }
})


export const {
    addCantiere, removeCantiere, selezionaCantiere, resetCantieri, setCantiereDaCreare, setAttributoAnagrafica
} = CantiereSlice.actions

export const CantieriSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantieri;
export const CantiereSelezionatoSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantiereSelezionato;
export const CantiereDaCreareSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantiereDaCreare;
