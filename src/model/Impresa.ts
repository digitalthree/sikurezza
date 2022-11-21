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
    },
    macchine: string[], //TODO:inserire array di macchine
    maestranze: string[], //TODO:inserire array di maestranze
    impreseSubappaltatrici: Impresa[],
    documentiIdoneitaImpresa: Autodichiarazione[],
    comunicazioni: Comunicazioni,
    faunaDocumentId?: string
}

export interface Autodichiarazione {
    nome: string,
    presenza: boolean
    file: {name: string, value: string|undefined}
}

interface Comunicazioni {
    nomeDirettoreTecnico: string,
    telefonoDirettoreTecnico: string,
    mailDirettoreTecnico: string,
    nomeRls: string,
    telefonoRls: string,
    mailRls: string,
    nomeRspp: string,
    telefonoRspp: string,
    mailRspp: string,
    nomeResponsabileUfficioDocumentazione: string,
    telefonoResponsabileUfficioDocumentazione: string,
    mailResponsabileUfficioDocumentazione: string
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
            file: {name: "", value: undefined}
        },
        {
            nome: "Autodichiarazione Organico\n" +
                "medio annuo",
            presenza: false,
            file: {name: "", value: undefined}
        },
        {
            nome: "Autodichiarazione CCNL applicato\n" +
                "ai dipendenti",
            presenza: false,
            file: {name: "", value: undefined}
        },
        {
            nome: "Autodichiarazione di iscrizione alla \n" +
                "CCIAA con diciitura antimafia",
            presenza: false,
            file: {name: "", value: undefined}
        }
    ],
    comunicazioni: {
        nomeDirettoreTecnico: "",
        telefonoDirettoreTecnico: "",
        mailDirettoreTecnico: "",
        nomeRls: "",
        telefonoRls: "",
        mailRls: "",
        nomeRspp: "",
        telefonoRspp: "",
        mailRspp: "",
        nomeResponsabileUfficioDocumentazione: "",
        telefonoResponsabileUfficioDocumentazione: "",
        mailResponsabileUfficioDocumentazione: "",
    }
}