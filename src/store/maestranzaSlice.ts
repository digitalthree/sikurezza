import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    AnagraficaMaestranza,
    ComunicazioniMaestranza,
    DocumentiMaestranza,
    Maestranza,
    maestranzaDefault
} from "../model/Maestranza";
import {stat} from "fs";
import {setPropertyFileMaestranza} from "./switcCaseFunctions";

export interface MaestranzaState {
    maestranze: Maestranza[],
    maestranzaDaCreare: Maestranza
}

export const MaestranzaSlice = createSlice({
    name: "maestranzaSlice",
    initialState: {
        maestranze: [],
        maestranzaDaCreare: maestranzaDefault
    } as MaestranzaState,
    reducers: {
        addMaestranza(state: MaestranzaState, action: PayloadAction<Maestranza>){
            state.maestranze.push(action.payload)
        },
        setAnagraficaMaestranza(state: MaestranzaState, action: PayloadAction<AnagraficaMaestranza>){
            state.maestranzaDaCreare.anagrafica = action.payload
        },
        setDocumentiMaestranza(state: MaestranzaState, action: PayloadAction<DocumentiMaestranza>){
            state.maestranzaDaCreare.documenti = action.payload
        },
        setMaestranzaDaCreare(state: MaestranzaState, action: PayloadAction<Maestranza>){
            state.maestranzaDaCreare = action.payload
        },
        setFileUrlMaestranza(state: MaestranzaState, action: PayloadAction<{property: string, url: string}>){
            setPropertyFileMaestranza(state, action.payload.property, action.payload.url)
        }
    }
})

export const {
    addMaestranza, setAnagraficaMaestranza, setDocumentiMaestranza, setMaestranzaDaCreare, setFileUrlMaestranza
} = MaestranzaSlice.actions


export const MaestranzeSelector = (state: {maestranzaSlice: MaestranzaState}) => state.maestranzaSlice.maestranze
export const MaestranzaDaCreareSelector = (state: {maestranzaSlice: MaestranzaState}) => state.maestranzaSlice.maestranzaDaCreare
