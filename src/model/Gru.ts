
export interface Gru {
    cantiere: string,
    proprieta: boolean,
    noleggiatore: string,
    tipologia: string,
    marca: string,
    modello: string,
    matricolaINAIL: string,
    numeroDiFabbrica: string,
    verifiche: Verifica[],
    note: string,
    tecnicoIncaricatoAllaProgettazioneDellaStrutturaDiFondazione: string,
    documentiFondazioneGru: DocumentoFondazioneGru[],
    collaudo: {
        nome: string,
        presenza: "SI"|"NO"|"NR",
        file: {nome: string, value: File|string|undefined}
    }
}

export interface Verifica {
    nome: string,
    effettuataIl: string,
    scadenza: string
}

export interface DocumentoFondazioneGru {
    nome: string,
    presenza: boolean,
    file: {nome: string, value: File|string|undefined}
}

export const gruDefault: Gru = {
    cantiere: "",
    proprieta: false,
    noleggiatore: "",
    tipologia: "",
    marca: "",
    modello: "",
    matricolaINAIL: "",
    numeroDiFabbrica: "",
    verifiche: [
        {
            nome: "Verifica Periodica",
            effettuataIl: "",
            scadenza: ""
        },
        {
            nome: "Verifica Funi e Catene",
            effettuataIl: "",
            scadenza: ""
        }
    ],
    note: "",
    tecnicoIncaricatoAllaProgettazioneDellaStrutturaDiFondazione: "",
    documentiFondazioneGru: [
        {
            nome: "Progetto e relazione della struttura di fondazione",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Idoneità del piano di posa",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Libretto",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Dichiarazione di conformità",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Dichiarzione di corretta installazione",
            presenza: false,
            file: {nome: "", value: undefined}
        }
    ],
    collaudo: {
        nome: "Collaudo",
        presenza: "NR",
        file: {nome: "", value: undefined}
    }
}