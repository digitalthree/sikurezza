import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    AnagraficaMaestranza, Documento,
    Maestranza,
    maestranzaDefault,
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
        setDocumentiMaestranza(state: MaestranzaState, action: PayloadAction<Documento[]>){
            state.maestranzaDaCreare.documenti = action.payload
        },
        setMaestranzaDaCreare(state: MaestranzaState, action: PayloadAction<Maestranza>){
            state.maestranzaDaCreare = action.payload
        },
        setFileInDocumentiMaestranza(state: MaestranzaState, action: PayloadAction<{nome: string, file: string|File}>){
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if(d.nome === action.payload.nome) {
                    d.file = action.payload.file
                }
            })
        }
    }
})

export const {
    addMaestranza, setAnagraficaMaestranza, setDocumentiMaestranza, setMaestranzaDaCreare, setFileInDocumentiMaestranza
} = MaestranzaSlice.actions


export const MaestranzeSelector = (state: {maestranzaSlice: MaestranzaState}) => state.maestranzaSlice.maestranze
export const MaestranzaDaCreareSelector = (state: {maestranzaSlice: MaestranzaState}) => state.maestranzaSlice.maestranzaDaCreare
