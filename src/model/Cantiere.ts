import {Impresa} from "./Impresa";
import {Maestranza} from "./Maestranza";
import {Gru} from "./Gru";
import {Ponteggio} from "./Ponteggio";
import {Estintore} from "./Estintore";

export interface Cantiere {
    anagrafica: AnagraficaCantiere
    squadraOperativa: SquadraOperativa
    gruMezziDiSollevamento: {
        listaGru: Gru[],
        controlliPeriodici: ControlloCantiere[]
    }
    ponteggi: {
        listaPonteggi: Ponteggio[],
        controlliPeriodici: ControlloCantiere[]
    }
    estintori: Estintore[]
    impiantoElettrico: ImpiantoElettrico
}

export interface AnagraficaCantiere {
    tipologiaIntervento: string,
    denomiazione: string
    indirizzo: string
    responsabileLavori: string
    committente: string
    CSP: string
    telefonoCSP: string
    emailCSP: string
    CSE: string
    telefonoCSE: string
    emailCSE: string
    DirettoreLavoro: string
    telefonoDirettoreLavoro: string
    emailDirettoreLavoro: string
}

export interface SquadraOperativa {
    responsabileTecnico: Maestranza[]
    preposti: Maestranza[]
    addettiPrimoSoccorso: Maestranza[]
    addettiAntiincendio: Maestranza[]
    RLS: Maestranza
    medicoCompetente: Maestranza
    RSPP: Maestranza
    delegatiSicurezza: Maestranza[]
    squadraOperai: Maestranza[]
    impreseSubappaltatrici: Maestranza[]
}

export interface ImpiantoElettrico {
    impresaEsecutriceDelleOpereElettriche: Impresa
    prepostoImpresaEsecutrice: string
    telefonoPrepostoImpresaEsecutrice: string
    documentiImpiantoElettrico: DocumentoImpiantoElettrico[]
    denunciaImpianto: boolean
    esito: {
        nome: string,
        esito: "Protetto"|"Non Protetto",
        file: {nome: string, value: File|string|undefined}
    }
    registroControllo: ControlloCantiere[]
    verifichePeriodicheAUSL: ControlloCantiere[]
}

export interface DocumentoImpiantoElettrico {
    nome: string,
    presenza: boolean,
    file: {nome: string, value: File|string|undefined}
}

export interface ControlloCantiere {
    data: string,
    nota: string,
    file: {nome: string, value: File|string|undefined}
}