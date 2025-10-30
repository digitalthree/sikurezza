import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AllegatoPonteggio, ControlloPonteggio, Ponteggio, ponteggioDefault} from "../model/Ponteggio";

export interface PonteggioState {
    ponteggi: Ponteggio[],
    ponteggioDaCreare: Ponteggio,
    ponteggioSelezionato?: Ponteggio
}

export const PonteggioSlice = createSlice({
    name: 'ponteggioSlice',
    initialState: {
        ponteggi: [],
        ponteggioDaCreare: ponteggioDefault,
        ponteggioSelezionato: undefined
    } as PonteggioState,
    reducers: {
        addPonteggio(state: PonteggioState, action: PayloadAction<Ponteggio>){
            state.ponteggi.push(action.payload)
        },
        removePonteggio(state: PonteggioState, action: PayloadAction<string>){
            state.ponteggi = state.ponteggi.filter(p => p.id !== action.payload)
        },
        setPonteggioSelezionato(state: PonteggioState, action: PayloadAction<Ponteggio|undefined>){
            state.ponteggioSelezionato = action.payload
        },
        resetPonteggio(state: PonteggioState){
            state.ponteggi = []
        },
        setPonteggioDaCreare(state: PonteggioState, action: PayloadAction<Ponteggio>){
            state.ponteggioDaCreare = action.payload
        },
        setAttributoInPonteggio(state: PonteggioState, action: PayloadAction<{nome: string, value: string|boolean|"<20m"|">20m"}>){
            state.ponteggioDaCreare.attr.forEach(a => {
                if(a.nome === action.payload.nome){
                    a.value = action.payload.value
                }
            })
            if(state.ponteggioSelezionato){
                state.ponteggioSelezionato.attr.forEach(a => {
                    if(a.nome === action.payload.nome){
                        a.value = action.payload.value
                    }
                })
            }
        },
        setAllegatoInPonteggio(state: PonteggioState, action: PayloadAction<{nome: string, value: AllegatoPonteggio}>){
            state.ponteggioDaCreare.allegatiPonteggio.forEach(a => {
                if(a.nome === action.payload.nome){
                    a.nome = action.payload.value.nome
                    a.presenza = action.payload.value.presenza
                    a.file = action.payload.value.file
                }
            })
            if(state.ponteggioSelezionato){
                state.ponteggioSelezionato.allegatiPonteggio.forEach(a => {
                    if(a.nome === action.payload.nome){
                        a.nome = action.payload.value.nome
                        a.presenza = action.payload.value.presenza
                        a.file = action.payload.value.file
                    }
                })
            }
        },
        setControlloInPonteggio(state: PonteggioState, action: PayloadAction<{nome: string, value: ControlloPonteggio}>){
            state.ponteggioDaCreare.controlli.forEach(c => {
                if(c.nome === action.payload.nome){
                    c.effettuato = action.payload.value.effettuato
                    c.data = action.payload.value.data
                    c.file = action.payload.value.file
                }
            })
            if(state.ponteggioSelezionato){
                state.ponteggioSelezionato.controlli.forEach(c => {
                    if(c.nome === action.payload.nome){
                        c.effettuato = action.payload.value.effettuato
                        c.data = action.payload.value.data
                        c.file = action.payload.value.file
                    }
                })
            }
        }
    }
})

export const {
    addPonteggio, removePonteggio, resetPonteggio, setPonteggioDaCreare, setPonteggioSelezionato, setAttributoInPonteggio,
    setControlloInPonteggio, setAllegatoInPonteggio
} = PonteggioSlice.actions

export const PonteggioSelector = (state: {ponteggioSlice: PonteggioState}) => state.ponteggioSlice.ponteggi
export const PonteggioSelezionatoSelector = (state: {ponteggioSlice: PonteggioState}) => state.ponteggioSlice.ponteggioSelezionato
export const PonteggioDaCreareSelector = (state: {ponteggioSlice: PonteggioState}) => state.ponteggioSlice.ponteggioDaCreare

