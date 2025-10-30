import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    DocumentoMacchinaEAttrezzatura,
    MacchinaEAttrezzatura,
    macchinaEAttrezzaturaDefault,
} from "../model/MacchineEAttrezzature";
import {PonteggioState} from "./ponteggioSlice";

export interface MacchinaEAttrezzaturaState {
    macchineEAttrezzature: MacchinaEAttrezzatura[],
    macchinaEAttrezzaturaDaCreare: MacchinaEAttrezzatura,
    macchinaEAttrezzaturaSelezionata?: MacchinaEAttrezzatura,
}

export const MacchinaEAttrezzaturaSlice = createSlice({
    name: 'macchinaEAttrezzaturaSlice',
    initialState: {
        macchineEAttrezzature: [],
        macchinaEAttrezzaturaDaCreare: macchinaEAttrezzaturaDefault,
        macchinaEAttrezzaturaSelezionata: undefined
    } as MacchinaEAttrezzaturaState,
    reducers: {
        addMacchinaEAttrezzatura(state: MacchinaEAttrezzaturaState, action: PayloadAction<MacchinaEAttrezzatura>){
            state.macchineEAttrezzature.push(action.payload)
        },
        removeMacchinaEAttrezzatura(state: MacchinaEAttrezzaturaState, action: PayloadAction<string>){
            state.macchineEAttrezzature = state.macchineEAttrezzature.filter(m => m.id !== action.payload)
        },
        setMacchinaEAttrezzaturaSelezionato(state: MacchinaEAttrezzaturaState, action: PayloadAction<MacchinaEAttrezzatura|undefined>){
            state.macchinaEAttrezzaturaSelezionata = action.payload
        },
        resetMacchinaEAttrezzatura(state: MacchinaEAttrezzaturaState){
            state.macchineEAttrezzature = []
        },
        setMacchinaEAttrezzaturaDaCreare(state: MacchinaEAttrezzaturaState, action: PayloadAction<MacchinaEAttrezzatura>){
            state.macchinaEAttrezzaturaDaCreare = action.payload
        },
        setAttributoInMacchinaEAttrezzatura(state: MacchinaEAttrezzaturaState, action: PayloadAction<{nome: string, value: string|"Macchina"|"Attrezzatura"}>){
            state.macchinaEAttrezzaturaDaCreare.attr.forEach(a => {
                if(a.nome === action.payload.nome){
                    a.value = action.payload.value
                }
            })
            if(state.macchinaEAttrezzaturaSelezionata){
                state.macchinaEAttrezzaturaSelezionata.attr.forEach(a => {
                    if(a.nome === action.payload.nome){
                        a.value = action.payload.value
                    }
                })
            }
        },
        setDocumentoInMacchinaEAttrezzatura(state: MacchinaEAttrezzaturaState, action: PayloadAction<{nome: string, value: DocumentoMacchinaEAttrezzatura}>){
            state.macchinaEAttrezzaturaDaCreare.documenti.forEach(d => {
                if(d.nome === action.payload.nome){
                    d.nome = action.payload.value.nome
                    d.presenza = action.payload.value.presenza
                    d.file = action.payload.value.file
                }
            })
            if(state.macchinaEAttrezzaturaSelezionata){
                state.macchinaEAttrezzaturaSelezionata.documenti.forEach(d => {
                    if(d.nome === action.payload.nome){
                        d.nome = action.payload.value.nome
                        d.presenza = action.payload.value.presenza
                        d.file = action.payload.value.file
                    }
                })
            }
        },
        setUltimaRevisioneInMacchinaEAttrezzatura(state: MacchinaEAttrezzaturaState, action: PayloadAction<{nome: string, value: {nome: string, effettuataIl: string, scadenza: string, label: string}}>){
            state.macchinaEAttrezzaturaDaCreare.ultimaRevisione = action.payload.value
            if(state.macchinaEAttrezzaturaSelezionata){
                state.macchinaEAttrezzaturaSelezionata.ultimaRevisione = action.payload.value
            }
        }
    }
})

export const {
    addMacchinaEAttrezzatura, removeMacchinaEAttrezzatura, resetMacchinaEAttrezzatura, setAttributoInMacchinaEAttrezzatura,
    setMacchinaEAttrezzaturaDaCreare, setMacchinaEAttrezzaturaSelezionato, setDocumentoInMacchinaEAttrezzatura, setUltimaRevisioneInMacchinaEAttrezzatura
} = MacchinaEAttrezzaturaSlice.actions

export const MacchinaEAttrezzaturaSelector = (state: {macchinaEAttrezzaturaSlice: MacchinaEAttrezzaturaState}) => state.macchinaEAttrezzaturaSlice.macchineEAttrezzature
export const MacchinaEAttrezzaturaSelezionatoSelector = (state: {macchinaEAttrezzaturaSlice: MacchinaEAttrezzaturaState}) => state.macchinaEAttrezzaturaSlice.macchinaEAttrezzaturaSelezionata
export const MacchinaEAttrezzaturaDaCreareSelector = (state: {macchinaEAttrezzaturaSlice: MacchinaEAttrezzaturaState}) => state.macchinaEAttrezzaturaSlice.macchinaEAttrezzaturaDaCreare

