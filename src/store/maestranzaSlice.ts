import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    Corso,
    Documento,
    Maestranza,
    maestranzaDefault,
} from "../model/Maestranza";

export interface MaestranzaState {
    maestranze: Maestranza[]
    maestranzaSelezionata?: Maestranza,
    maestranzaDaCreare: Maestranza
}

export const MaestranzaSlice = createSlice({
    name: "maestranzaSlice",
    initialState: {
        maestranze: [],
        maestranzaSelezionata: undefined,
        maestranzaDaCreare: maestranzaDefault
    } as MaestranzaState,
    reducers: {
        addMaestranzaToMaestranzaSlice(state: MaestranzaState, action: PayloadAction<Maestranza>) {
            if (state.maestranze.filter(m => m.faunaDocumentId === action.payload.faunaDocumentId).length === 0) {
                state.maestranze.push(action.payload)
            }
        },
        removeMaestranzaToMaestranzaSlice(state: MaestranzaState, action: PayloadAction<string>) {
            state.maestranze = state.maestranze.filter(m => m.faunaDocumentId !== action.payload)
        },
        resetMaestranzeInMaestranzaSlice(state: MaestranzaState) {
            state.maestranze = []
        },
        setMaestranzaSelezionata(state: MaestranzaState, action: PayloadAction<Maestranza | undefined>) {
            state.maestranzaSelezionata = action.payload
        },
        setAnagraficaMaestranza(state: MaestranzaState, action: PayloadAction<{ label: string, value: string | boolean }>) {
            state.maestranzaDaCreare.anagrafica.forEach(m => {
                if (m.label === action.payload.label) {
                    m.value = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.anagrafica.forEach(m => {
                    if (m.label === action.payload.label) {
                        m.value = action.payload.value
                    }
                })
            }
        },
        addCorsoMaestranza(state: MaestranzaState, action: PayloadAction<string>) {
            let corsoDaAggiungere: Corso = {
                nome: action.payload,
                label: action.payload,
                richiedibile: true,
                scadenza: "",
                file: undefined
            }
            state.maestranzaDaCreare.corsi.push(corsoDaAggiungere)
            if(state.maestranzaSelezionata){
                state.maestranzaSelezionata.corsi.push(corsoDaAggiungere)
            }
        },
        setMaestranzaDaCreare(state: MaestranzaState, action: PayloadAction<Maestranza>) {
            state.maestranzaDaCreare = action.payload
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata = action.payload
            }
        },
        setFileInDocumentiMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, file: string | File | undefined }>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.file = action.payload.file
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.file = action.payload.file
                    }
                })
            }
        },
        setFileInCorsiMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, file: string | File | undefined }>) {
            state.maestranzaDaCreare.corsi.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.file = action.payload.file
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.corsi.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.file = action.payload.file
                    }
                })
            }
        },
        setRichiedibileInMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: boolean }>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.richiedibile = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.richiedibile = action.payload.value
                    }
                })
            }
            if (!action.payload.value) {
                state.maestranzaDaCreare.documenti.forEach(d => {
                    if (d.nome === action.payload.nome) {
                        d.file = undefined
                        d.effettuatoIl = ""
                        d.scadenza = ""
                    }
                })
                if (state.maestranzaSelezionata) {
                    state.maestranzaSelezionata.documenti.forEach(d => {
                        if (d.nome === action.payload.nome) {
                            d.file = undefined
                            d.effettuatoIl = ""
                            d.scadenza = ""
                        }
                    })
                }

            }
        },
        setRichiedibileInCorsoMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: boolean }>) {
            state.maestranzaDaCreare.corsi.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.richiedibile = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.corsi.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.richiedibile = action.payload.value
                    }
                })
            }
            if (!action.payload.value) {
                state.maestranzaDaCreare.corsi.forEach(d => {
                    if (d.nome === action.payload.nome) {
                        d.file = undefined
                        d.scadenza = ""
                    }
                })
                if (state.maestranzaSelezionata) {
                    state.maestranzaSelezionata.corsi.forEach(d => {
                        if (d.nome === action.payload.nome) {
                            d.file = undefined
                            d.scadenza = ""
                        }
                    })
                }

            }
        },
        setEffettuatoIlInMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: string }>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.effettuatoIl = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.effettuatoIl = action.payload.value
                    }
                })
            }
        },
        setScadenzaIlInMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: string }>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.scadenza = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.scadenza = action.payload.value
                    }
                })
            }
        },
        setDataFineContrattoIlInMaestranza(state: MaestranzaState, action: PayloadAction<string>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === 'contratto') {
                    d.dataFineContratto = action.payload
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === 'contratto') {
                        d.dataFineContratto = action.payload
                    }
                })
            }
        },
        setMansioneInMaestranza(state: MaestranzaState, action: PayloadAction<string>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === 'contratto') {
                    d.mansione = action.payload
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === 'contratto') {
                        d.mansione = action.payload
                    }
                })
            }
        },
        setPrescrizioniLimitazioniInMaestranza(state: MaestranzaState, action: PayloadAction<string>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === 'visitaMedica') {
                    d.prescrizioniLimitazioni = action.payload
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === 'visitaMedica') {
                        d.prescrizioniLimitazioni = action.payload
                    }
                })
            }
        },
        setTipologiaContrattoInMaestranza(state: MaestranzaState, action: PayloadAction<'Indeterminato' | 'Determinato'>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                d.tipologia = action.payload
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    d.tipologia = action.payload
                })
            }
        },
        setConsegnatoInMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: boolean }>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.consegnato = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.consegnato = action.payload.value
                    }
                })
            }
        },
        setConsegnatoIlInMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: string }>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.consegnatoIl = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.consegnatoIl = action.payload.value
                    }
                })
            }
        },
        setNominaInMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: boolean }>) {
            state.maestranzaDaCreare.documenti.forEach((d) => {
                if (d.nome === action.payload.nome) {
                    d.nomina = action.payload.value
                }
            })
            if (state.maestranzaSelezionata) {
                state.maestranzaSelezionata.documenti.forEach((d) => {
                    if (d.nome === action.payload.nome) {
                        d.nomina = action.payload.value
                    }
                })
            }
        },
        setComunicazioniInMaestranza(state: MaestranzaState, action: PayloadAction<{ nome: string, value: string | number }>) {
            if (action.payload.nome === "telefono") {
                state.maestranzaDaCreare.comunicazioni.telefono = action.payload.value as number
                if (state.maestranzaSelezionata) {
                    state.maestranzaSelezionata.comunicazioni.telefono = action.payload.value as number
                }
            }
            if (action.payload.nome === "cellularePrivato") {
                state.maestranzaDaCreare.comunicazioni.cellularePrivato = action.payload.value as number
                if (state.maestranzaSelezionata) {
                    state.maestranzaSelezionata.comunicazioni.cellularePrivato = action.payload.value as number
                }
            }
            if (action.payload.nome === "cellulareAziendale") {
                state.maestranzaDaCreare.comunicazioni.cellulareAziendale = action.payload.value as number
                if (state.maestranzaSelezionata) {
                    state.maestranzaSelezionata.comunicazioni.cellulareAziendale = action.payload.value as number
                }
            }
            if (action.payload.nome === "email") {
                state.maestranzaDaCreare.comunicazioni.email = action.payload.value as string
                if (state.maestranzaSelezionata) {
                    state.maestranzaSelezionata.comunicazioni.email = action.payload.value as string
                }
            }
        },
    }
})

export const {
    addMaestranzaToMaestranzaSlice,
    removeMaestranzaToMaestranzaSlice,
    setMaestranzaSelezionata,
    setAnagraficaMaestranza,
    setMaestranzaDaCreare,
    setFileInDocumentiMaestranza,
    setConsegnatoInMaestranza,
    setScadenzaIlInMaestranza,
    setTipologiaContrattoInMaestranza,
    setConsegnatoIlInMaestranza,
    setDataFineContrattoIlInMaestranza,
    setPrescrizioniLimitazioniInMaestranza,
    setEffettuatoIlInMaestranza,
    setMansioneInMaestranza,
    setNominaInMaestranza,
    setComunicazioniInMaestranza,
    resetMaestranzeInMaestranzaSlice,
    setRichiedibileInMaestranza,
    addCorsoMaestranza,
    setRichiedibileInCorsoMaestranza,
    setFileInCorsiMaestranza
} = MaestranzaSlice.actions


export const MaestranzaSelezionataSelector = (state: { maestranzaSlice: MaestranzaState }) => state.maestranzaSlice.maestranzaSelezionata
export const MaestranzeSelector = (state: { maestranzaSlice: MaestranzaState }) => state.maestranzaSlice.maestranze
export const MaestranzaDaCreareSelector = (state: { maestranzaSlice: MaestranzaState }) => state.maestranzaSlice.maestranzaDaCreare
