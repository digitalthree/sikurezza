import {Cantiere} from "./Cantiere";
import {Maestranza} from "./Maestranza";

export interface Impresa {
    tipo: 'Affidataria' | 'Subappaltatrice',
    anagrafica: {
        attr: {label: string, value: string}[],
        logo: {nome: string, value: File|string|undefined},
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
    maestranze: string[],
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

export interface ItemComunicazione {
    mansione: string,
    nome: string
    telefono: string,
    email: string
}

export const impresaTemporanea: Impresa = {
    tipo: "Affidataria",
    anagrafica: {
        attr: [
            {label: 'denominazione', value: ''},
            {label: 'sedeLegale', value: ''},
            {label: 'codiceFiscale', value: ''},
            {label: 'partitaIva', value: ''},
            {label: 'formaGiuridica', value: ''},
            {label: 'amministratore', value: ''},
            {label: 'codiceFiscaleAmministratore', value: ''},
            {label: 'durc', value: ''},
            {label: 'scadenza', value: ''},
        ],
        logo: {nome: "logo", value: undefined},
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
            nome: "",
            telefono: "",
            email: ""
        },
        {
            mansione: "RSPP",
            nome: "",
            telefono: "",
            email: ""
        },
        {
            mansione: "Responsabile d'ufficio per la documentazione",
            nome: "",
            telefono: "",
            email: ""
        }
    ],
    creataDa: ""
}