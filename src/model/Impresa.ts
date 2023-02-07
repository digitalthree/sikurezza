import {Cantiere} from "./Cantiere";

export interface Impresa {
    tipo: 'Affidataria' | 'Subappaltatrice',
    cantiere: Cantiere,
    anagrafica: {
        denominazione: string,
        sedeLegale: string,
        codiceFiscale: string,
        partitaIva: string,
        formaGiuridica: string,
        amministratore: string,
        codiceFiscaleAmministratore: string,
        durc: string,
        scadenza: string,
        dvr: {
            nome: string,
            presenza: boolean,
            file: {nome: string, value: File|string|undefined},
            dataAggiornamento: string
        },
        certificatoCCIAA: {
            nome: string,
            presenza: boolean,
            file: {nome: string, value: File|string|undefined},
            scadenza: string
        }
    },
    macchine: string[], //TODO:inserire array di macchine
    maestranze: string[], //TODO:inserire array di maestranze
    impreseSubappaltatrici: Impresa[],
    documentiIdoneitaImpresa: Autodichiarazione[],
    comunicazioni: ItemComunicazione[],
    creataDa: string
    faunaDocumentId?: string
}

export interface Autodichiarazione {
    nome: string,
    presenza: boolean
    file: {nome: string, value: File|string|undefined}
}

interface ItemComunicazione {
    mansione: string,
    telefono: string,
    email: string
}

export const impresaTemporanea: Impresa = {
    tipo: "Affidataria",
    cantiere: {} as Cantiere,
    anagrafica: {
        denominazione: "",
        sedeLegale: "",
        codiceFiscale: "",
        partitaIva: "",
        formaGiuridica: "",
        amministratore: "",
        codiceFiscaleAmministratore: "",
        durc: "",
        scadenza: "",
        dvr: {
            nome: "dvr",
            presenza: false,
            file: {nome: "", value: undefined},
            dataAggiornamento: ""
        },
        certificatoCCIAA: {
            nome: "certificatoCCIAA",
            presenza: false,
            file: {nome: "", value: undefined},
            scadenza: ""
        }
    },
    macchine: [],
    maestranze: [],
    impreseSubappaltatrici: [],
    documentiIdoneitaImpresa: [
        {
            nome: "Autodichiarazione di non essere\n" +
                "oggetto di provvedimenti di \n" +
                "sospensione",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Autodichiarazione Organico\n" +
                "medio annuo",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Autodichiarazione CCNL applicato\n" +
                "ai dipendenti",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Autodichiarazione di iscrizione alla \n" +
                "CCIAA con dicitura antimafia",
            presenza: false,
            file: {nome: "", value: undefined}
        }
    ],

    comunicazioni: [
        {
            mansione: "RLS",
            telefono: "",
            email: ""
        },
        {
            mansione: "RSPP",
            telefono: "",
            email: ""
        },
        {
            mansione: "Responsabile d'ufficio per la documentazione",
            telefono: "",
            email: ""
        }
    ],
    creataDa: ""
}