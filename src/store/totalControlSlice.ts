import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Impresa} from "../model/Impresa";
import {Maestranza} from "../model/Maestranza";
import {MacchinaEAttrezzatura} from "../model/MacchineEAttrezzature";
import {Ponteggio} from "../model/Ponteggio";
import {Gru} from "../model/Gru";

export interface TotalControlState {
    ricercaByImpresa?: string,
    ricercaByMaestranza?: string,
    ricercaByMacchinaEAttrezzatura?: string,
    ricercaByPonteggio?: string,
    ricercaByGru?: string,
    items: {item: (Impresa|Maestranza|MacchinaEAttrezzatura|Ponteggio|Gru), tipo: "Impresa"|"Maestranza"|"MacchinaEAttrezzatura"|"Ponteggio"|"Gru", problema: string}[]
}

export const TotalControlSlice = createSlice({
    name: 'totalControlSlice',
    initialState: {
        items: []
    } as TotalControlState,
    reducers: {
        addItem(state: TotalControlState, action: PayloadAction<{item: (Impresa|Maestranza|MacchinaEAttrezzatura|Ponteggio|Gru), tipo: "Impresa"|"Maestranza"|"MacchinaEAttrezzatura"|"Ponteggio"|"Gru", problema: string}>){
            state.items.push(action.payload)
        },
        resetItem(state: TotalControlState){
            state.items = []
        },
        setRicerca(state: TotalControlState, action: PayloadAction<{testo: string, tipo: string}>){
            if(action.payload.tipo === "Impresa"){
                state.ricercaByImpresa = action.payload.testo
            }
            if(action.payload.tipo === "Maestranza"){
                state.ricercaByMaestranza = action.payload.testo
            }
            if(action.payload.tipo === "MacchinaEAttrezzatura"){
                state.ricercaByMacchinaEAttrezzatura = action.payload.testo
            }
            if(action.payload.tipo === "Ponteggio"){
                state.ricercaByPonteggio = action.payload.testo
            }
            if(action.payload.tipo === "Gru"){
                state.ricercaByGru = action.payload.testo
            }
        }
    }
})

export const {
    addItem, setRicerca, resetItem
} = TotalControlSlice.actions


export const TotalControlItemsSelector = (state: {totalControlSlice: TotalControlState}) => state.totalControlSlice.items
export const TotalControlRicercaByImpresaSelector = (state: {totalControlSlice: TotalControlState}) => state.totalControlSlice.ricercaByImpresa
export const TotalControlRicercaByMaestranzaSelector = (state: {totalControlSlice: TotalControlState}) => state.totalControlSlice.ricercaByMaestranza
export const TotalControlRicercaByMacchinaEAttrezzaturaSelector = (state: {totalControlSlice: TotalControlState}) => state.totalControlSlice.ricercaByMacchinaEAttrezzatura
export const TotalControlRicercaByPonteggioSelector = (state: {totalControlSlice: TotalControlState}) => state.totalControlSlice.ricercaByPonteggio
export const TotalControlRicercaByGruSelector = (state: {totalControlSlice: TotalControlState}) => state.totalControlSlice.ricercaByGru
