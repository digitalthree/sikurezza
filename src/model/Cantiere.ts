import {Impresa, impresaTemporanea} from "./Impresa";
import {Maestranza, maestranzaDefault} from "./Maestranza";
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
    impiantoElettrico: ImpiantoElettrico,
    faunaDocumentId?: string,
    creatoDa: string
}

export interface AnagraficaCantiere {
    attr: {label: string, nome: string, value: string}[]
}

export interface SquadraOperativa {
    responsabileTecnico: Maestranza[]
    preposti: Maestranza[]
    addettiPrimoSoccorso: Maestranza[]
    addettiAntiIncendio: Maestranza[]
    RLS: Maestranza
    RLST: string
    medicoCompetente: string
    RSPP: Maestranza
    RSPPT: string
    delegatiSicurezza: Maestranza[]
    squadraOperai: Maestranza[]
    impreseSubappaltatrici: Impresa[]
}

export interface ImpiantoElettrico {
    impresaEsecutriceDelleOpereElettriche: Impresa
    prepostoImpresaEsecutrice: string
    telefonoPrepostoImpresaEsecutrice: string
    documentiImpiantoElettrico: DocumentoImpiantoElettrico[]
    denunciaImpianto: boolean
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

export const cantiereDefault: Cantiere = {
    anagrafica: {
        attr: [
            {label: "Tipologia d'intervento", nome: "tipologiaIntervento", value: ""},
            {label: "Denominazione", nome: "denominazione", value: ""},
            {label: "Indirizzo", nome: "indirizzo", value: ""},
            {label: "Responsabile Lavori", nome: "responsabileLavori", value: ""},
            {label: "Committente", nome: "committente", value: ""},
            {label: "CSP", nome: "CSP", value: ""},
            {label: "Telefono CSP", nome: "telefonoCSP", value: ""},
            {label: "Mail CSP", nome: "emailCSP", value: ""},
            {label: "CSE", nome: "CSE", value: ""},
            {label: "Telefono CSE", nome: "telefonoCSE", value: ""},
            {label: "Mail CSE", nome: "emailCSE", value: ""},
            {label: "Direttore Lavori", nome: "DirettoreLavori", value: ""},
            {label: "Telefono Direttore Lavori", nome: "telefonoDirettoreLavori", value: ""},
            {label: "Mail Direttore Lavori", nome: "emailDirettoreLavori", value: ""},
        ]
    },
    squadraOperativa: {
        responsabileTecnico:[],
        preposti: [],
        addettiPrimoSoccorso: [],
        addettiAntiIncendio: [],
        RLS: maestranzaDefault,
        RLST: "",
        medicoCompetente: "",
        RSPP: maestranzaDefault,
        RSPPT: "",
        delegatiSicurezza: [],
        squadraOperai: [],
        impreseSubappaltatrici: [],
    },
    gruMezziDiSollevamento: {
        listaGru: [],
        controlliPeriodici: []
    },
    ponteggi: {
        listaPonteggi: [],
        controlliPeriodici: []
    },
    estintori: [],
    impiantoElettrico: {
        impresaEsecutriceDelleOpereElettriche: impresaTemporanea,
        prepostoImpresaEsecutrice: "",
        telefonoPrepostoImpresaEsecutrice: "",
        documentiImpiantoElettrico: [],
        denunciaImpianto: false,
        registroControllo: [],
        verifichePeriodicheAUSL: [],
    },
    creatoDa: ""
}