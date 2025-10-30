import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DocumentoFondazioneGru, Gru, gruDefault, Verifica} from "../model/Gru";

export interface GruState {
    gru: Gru[],
    gruDaCreare: Gru
    gruSelezionata?: Gru
}

export const GruSlice = createSlice({
    name: 'gruSlice',
    initialState: {
        gru: [],
        gruDaCreare: gruDefault,
        gruSelezionata: undefined
    } as GruState,
    reducers: {
        addGru(state: GruState, action: PayloadAction<Gru>){
            state.gru.push(action.payload)
        },
        removeGru(state: GruState, action: PayloadAction<string>){
            state.gru = state.gru.filter(g => g.id !== action.payload)
        },
        setGruSelezionata(state: GruState, action: PayloadAction<Gru|undefined>){
            state.gruSelezionata = action.payload
        },
        resetGru(state: GruState){
            state.gru = []
        },
        setGruDaCreare(state: GruState, action: PayloadAction<Gru>){
            state.gruDaCreare = action.payload
        },
        setAttributoInGru(state: GruState, action: PayloadAction<{nome: string, value: string|boolean}>){
            state.gruDaCreare.attr.forEach(a => {
                if(a.nome === action.payload.nome){
                    a.value = action.payload.value
                }
            })
            if(state.gruSelezionata){
                state.gruSelezionata.attr.forEach(a => {
                    if(a.nome === action.payload.nome){
                        a.value = action.payload.value
                    }
                })
            }
        },
        setVerificaInGru(state: GruState, action: PayloadAction<{nome: string, value: Verifica}>){
            state.gruDaCreare.verifiche.forEach(v => {
                if(v.nome === action.payload.nome){
                    v.nome = action.payload.value.nome
                    v.scadenza = action.payload.value.scadenza
                    v.effettuataIl = action.payload.value.effettuataIl
                    v.label = action.payload.value.label
                }
            })
            if(state.gruSelezionata){
                state.gruSelezionata.verifiche.forEach(ve => {
                    if(ve.nome === action.payload.nome){
                        ve.nome = action.payload.value.nome
                        ve.scadenza = action.payload.value.scadenza
                        ve.effettuataIl = action.payload.value.effettuataIl
                        ve.label = action.payload.value.label
                    }
                })
            }
        },
        setDocumentoInGru(state: GruState, action: PayloadAction<{nome: string, value: DocumentoFondazioneGru}>){
            state.gruDaCreare.documenti.forEach(d => {
                if(d.nome === action.payload.nome){
                    d.presenza = action.payload.value.presenza
                    d.nome = action.payload.nome
                    d.file = action.payload.value.file
                }
            })
            if(state.gruSelezionata){
                state.gruSelezionata.documenti.forEach(d => {
                    if(d.nome === action.payload.nome){
                        d.presenza = action.payload.value.presenza
                        d.nome = action.payload.nome
                        d.file = action.payload.value.file
                    }
                })
            }
        }
    }
})

export const {
    addGru, removeGru, setGruSelezionata, resetGru, setGruDaCreare, setAttributoInGru, setVerificaInGru, setDocumentoInGru
} = GruSlice.actions

export const GruSelector = (state: {gruSlice: GruState}) => state.gruSlice.gru
export const GruSelezionataSelector = (state: {gruSlice: GruState}) => state.gruSlice.gruSelezionata
export const GruDaCreareSelector = (state: {gruSlice: GruState}) => state.gruSlice.gruDaCreare
