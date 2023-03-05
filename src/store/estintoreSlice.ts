import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Estintore, estintoreDefault} from "../model/Estintore";

export interface EstintoreState {
    estintori: Estintore[],
    estintoreSelezionato?: Estintore
}

export const EstintoreSlice = createSlice({
    name: 'estintoreSlice',
    initialState: {
        estintori: [],
    } as EstintoreState,
    reducers: {
        addEstintore(state: EstintoreState, action: PayloadAction<Estintore>){
            state.estintori.push(action.payload)
        },
        removeEstintore(state: EstintoreState, action: PayloadAction<string>){
            state.estintori = state.estintori.filter(e => e.faunaDocumentId !== action.payload)
        },
        setEstintoreSelezionato(state: EstintoreState, action: PayloadAction<Estintore|undefined>){
            state.estintoreSelezionato = action.payload
        }
    }
})

export const {
    addEstintore, removeEstintore, setEstintoreSelezionato
} = EstintoreSlice.actions

/*
Selettori
export const ComponentSelector = (state: {: EstintoreState}) => state..proprietà
*/

export const EstintoriSelector = (state: {estintoreSlice: EstintoreState}) => state.estintoreSlice.estintori
export const EstintoreSelezionatoSelector = (state: {estintoreSlice: EstintoreState}) => state.estintoreSlice.estintoreSelezionato
