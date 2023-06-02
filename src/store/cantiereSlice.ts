import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cantiere, cantiereDefault, ControlloCantiere} from "../model/Cantiere";
import {Impresa} from "../model/Impresa";
import {Maestranza} from "../model/Maestranza";
import {Gru} from "../model/Gru";
import {Ponteggio} from "../model/Ponteggio";
import {Estintore} from "../model/Estintore";

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
        },
        setAttributoSquadraOperativa(state: CantiereState, action: PayloadAction<{nome: string, value: (Maestranza | Impresa)[]}>){
            switch (action.payload.nome) {
                case "Responsabile Tecnico":
                    state.cantiereDaCreare.squadraOperativa.responsabileTecnico = action.payload.value as Maestranza[]
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.responsabileTecnico = action.payload.value as Maestranza[]
                    }
                    break;
                case "Preposti":
                    state.cantiereDaCreare.squadraOperativa.preposti = action.payload.value as Maestranza[]
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.preposti = action.payload.value as Maestranza[]
                    }
                    break;
                case "Addetti Primo Soccorso":
                    state.cantiereDaCreare.squadraOperativa.addettiPrimoSoccorso = action.payload.value as Maestranza[]
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.addettiPrimoSoccorso = action.payload.value as Maestranza[]
                    }
                    break;
                case "Addetti Antincendio":
                    state.cantiereDaCreare.squadraOperativa.addettiAntiIncendio = action.payload.value as Maestranza[]
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.addettiAntiIncendio = action.payload.value as Maestranza[]
                    }
                    break;
                case "RLS":
                    state.cantiereDaCreare.squadraOperativa.RLS = action.payload.value[0] as Maestranza
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.RLS = action.payload.value[0] as Maestranza
                    }
                    break;
                case "Medico Competente":
                    state.cantiereDaCreare.squadraOperativa.medicoCompetente = action.payload.value[0] as Maestranza
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.medicoCompetente = action.payload.value[0] as Maestranza
                    }
                    break;
                case "RSPP":
                    state.cantiereDaCreare.squadraOperativa.RSPP = action.payload.value[0] as Maestranza
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.RSPP = action.payload.value[0] as Maestranza
                    }
                    break;
                case "Delegati Sicurezza":
                    state.cantiereDaCreare.squadraOperativa.delegatiSicurezza = action.payload.value as Maestranza[]
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.delegatiSicurezza = action.payload.value as Maestranza[]
                    }
                    break;
                case "Squadra Operai":
                    state.cantiereDaCreare.squadraOperativa.squadraOperai = action.payload.value as Maestranza[]
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.squadraOperai = action.payload.value as Maestranza[]
                    }
                    break;
                case "Imprese Subappaltatrici":
                    state.cantiereDaCreare.squadraOperativa.impreseSubappaltatrici = action.payload.value as Impresa[]
                    if(state.cantiereSelezionato){
                        state.cantiereSelezionato.squadraOperativa.impreseSubappaltatrici = action.payload.value as Impresa[]
                    }
                    break;
                default:
                    break;
            }
        },
        setGruInCantiere(state: CantiereState, action: PayloadAction<Gru[]>){
            state.cantiereDaCreare.gruMezziDiSollevamento.listaGru = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.gruMezziDiSollevamento.listaGru = action.payload
            }
        },
        setControlloCantiereGru(state: CantiereState, action: PayloadAction<ControlloCantiere[]>){
            state.cantiereDaCreare.gruMezziDiSollevamento.controlliPeriodici = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.gruMezziDiSollevamento.controlliPeriodici = action.payload
            }
        },
        setPonteggioInCantiere(state: CantiereState, action: PayloadAction<Ponteggio[]>){
            state.cantiereDaCreare.ponteggi.listaPonteggi = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.ponteggi.listaPonteggi = action.payload
            }
        },
        setControlloCantierePonteggio(state: CantiereState, action: PayloadAction<ControlloCantiere[]>){
            state.cantiereDaCreare.ponteggi.controlliPeriodici = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.ponteggi.controlliPeriodici = action.payload
            }
        },
        setEstintoreInCantiere(state: CantiereState, action: PayloadAction<Estintore[]>){
            state.cantiereDaCreare.estintori = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.estintori = action.payload
            }
        },
        setImpreseEsecutriciOpereElettricheInCantiere(state: CantiereState, action: PayloadAction<Impresa>){
            state.cantiereDaCreare.impiantoElettrico.impresaEsecutriceDelleOpereElettriche = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.impiantoElettrico.impresaEsecutriceDelleOpereElettriche = action.payload
            }
        },
        setPrepostoImpiantoElettricoInCantiere(state: CantiereState, action: PayloadAction<string>){
            state.cantiereDaCreare.impiantoElettrico.prepostoImpresaEsecutrice = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.impiantoElettrico.prepostoImpresaEsecutrice = action.payload
            }
        },
        setTelefonoPrepostoImpiantoElettricoInCantiere(state: CantiereState, action: PayloadAction<string>){
            state.cantiereDaCreare.impiantoElettrico.telefonoPrepostoImpresaEsecutrice = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.impiantoElettrico.telefonoPrepostoImpresaEsecutrice = action.payload
            }
        },
        setDocumentoImpiantoElettricoInCantiere(state: CantiereState, action: PayloadAction<{nome: string, presenza: boolean, file: File|undefined|string}>){
            if(state.cantiereDaCreare.impiantoElettrico.documentiImpiantoElettrico.filter(d => d.nome === action.payload.nome).length === 0){
                state.cantiereDaCreare.impiantoElettrico.documentiImpiantoElettrico.push({
                    nome: action.payload.nome,
                    presenza: action.payload.presenza,
                    file: {nome: action.payload.nome, value: action.payload.file}
                })
            }else{
                state.cantiereDaCreare.impiantoElettrico.documentiImpiantoElettrico.forEach(d => {
                    if(d.nome === action.payload.nome){
                        d.file.value = action.payload.file
                        d.presenza = action.payload.presenza
                    }
                })
            }
            if(state.cantiereSelezionato){
                if(state.cantiereSelezionato.impiantoElettrico.documentiImpiantoElettrico.filter(d => d.nome === action.payload.nome).length === 0){
                    state.cantiereSelezionato.impiantoElettrico.documentiImpiantoElettrico.push({
                        nome: action.payload.nome,
                        presenza: action.payload.presenza,
                        file: {nome: action.payload.nome, value: action.payload.file}
                    })
                }else{
                    state.cantiereSelezionato.impiantoElettrico.documentiImpiantoElettrico.forEach(d => {
                        if(d.nome === action.payload.nome){
                            d.file.value = action.payload.file
                            d.presenza = action.payload.presenza
                        }
                    })
                }
            }

        },
        setDenunciaImpiantoElettricoInCantiere(state: CantiereState, action: PayloadAction<boolean>){
            state.cantiereDaCreare.impiantoElettrico.denunciaImpianto = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.impiantoElettrico.denunciaImpianto = action.payload
            }
        },
        setRegistroControlliImpiantoElettricoInCantiere(state: CantiereState, action: PayloadAction<ControlloCantiere[]>){
            state.cantiereDaCreare.impiantoElettrico.registroControllo = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.impiantoElettrico.registroControllo = action.payload
            }
        },
        setVerifichePeriodicheImpiantoElettricoInCantiere(state: CantiereState, action: PayloadAction<ControlloCantiere[]>){
            state.cantiereDaCreare.impiantoElettrico.verifichePeriodicheAUSL = action.payload
            if(state.cantiereSelezionato){
                state.cantiereSelezionato.impiantoElettrico.verifichePeriodicheAUSL = action.payload
            }
        },

    }
})


export const {
    addCantiere, removeCantiere, selezionaCantiere, resetCantieri, setCantiereDaCreare, setAttributoAnagrafica,
    setAttributoSquadraOperativa, setGruInCantiere, setControlloCantiereGru, setPonteggioInCantiere,
    setControlloCantierePonteggio, setEstintoreInCantiere, setImpreseEsecutriciOpereElettricheInCantiere,
    setPrepostoImpiantoElettricoInCantiere, setTelefonoPrepostoImpiantoElettricoInCantiere, setDocumentoImpiantoElettricoInCantiere,
    setDenunciaImpiantoElettricoInCantiere, setRegistroControlliImpiantoElettricoInCantiere, setVerifichePeriodicheImpiantoElettricoInCantiere
} = CantiereSlice.actions

export const CantieriSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantieri;
export const CantiereSelezionatoSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantiereSelezionato;
export const CantiereDaCreareSelector = (state: { cantiereSlice: CantiereState }) => state.cantiereSlice.cantiereDaCreare;
