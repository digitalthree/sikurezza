import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    AnagraficaMaestranza,
    ComunicazioniMaestranza,
    DocumentiMaestranza,
    Maestranza,
    maestranzaDefault
} from "../model/Maestranza";

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
        setComunicazioniMaestranza(state: MaestranzaState, action: PayloadAction<ComunicazioniMaestranza>){
            state.maestranzaDaCreare.comunicazioni = action.payload
        }
    }
})

export const {
    addMaestranza, setAnagraficaMaestranza, setComunicazioniMaestranza, setDocumentiMaestranza
} = MaestranzaSlice.actions


export const MaestranzeSelector = (state: {maestranzaSlice: MaestranzaState}) => state.maestranzaSlice.maestranze
export const MaestranzaDaCreareSelector = (state: {maestranzaSlice: MaestranzaState}) => state.maestranzaSlice.maestranzaDaCreare
