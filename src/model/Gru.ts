
export interface Gru {
    attr: {nome: string, value: string|boolean, label: string}[],
    verifiche: Verifica[],
    documenti: DocumentoFondazioneGru[]
    creatoDa: string,
    id?: string
}

export interface Verifica {
    nome: string,
    effettuataIl: string,
    scadenza: string,
    label: string
}

export interface DocumentoFondazioneGru {
    nome: string
    presenza: boolean | "SI" | "NO" | "NR",
    file: File|string|undefined
}

export const gruDefault: Gru = {
    attr: [
        {nome: 'cantiere', value: "", label: 'Attualmente in uso nel cantiere'},
        {nome: 'proprieta', value: false, label: 'Proprietà'},
        {nome: 'noleggiatore', value: "", label: 'Noleggiatore'},
        {nome: 'tipologia', value: "", label: 'Tipologia'},
        {nome: 'marca', value: "", label: 'Marca'},
        {nome: 'modello', value: "", label: 'Modello'},
        {nome: 'matricolaINAIL', value: "", label: 'Matricola INAIL'},
        {nome: 'numeroDiFabbrica', value: "", label: 'N. Di Fabbrica'},
        {nome: 'note', value: "", label: 'Note'},
        {nome: 'tecnicoIncaricatoAllaProgettazioneDellaStrutturaDiFondazione', value: "", label: 'Tecnico Incaricato alla Progettazione'},
    ],
    verifiche: [
        {
            nome: 'verificaPeriodica',
            effettuataIl: "",
            scadenza: "",
            label: 'Verifica Periodica'
        },
        {
            nome: 'verificaFuniECatene',
            effettuataIl: "",
            scadenza: "",
            label: 'Verifica Funi e Catene'
        },
    ],
    documenti: [
        {
            nome: 'Progetto e Relazione della Struttura di Fondazione',
            presenza: false,
            file: undefined
        },
        {
            nome: 'Idoneità del Piano Di Posa',
            presenza: false,
            file: undefined
        },
        {
            nome: 'Libretto',
            presenza: false,
            file: undefined
        },
        {
            nome: 'Dichiarazione Di Conformita',
            presenza: false,
            file: undefined
        },
        {
            nome: 'Dichiarazione Di Corretta Installazione',
            presenza: false,
            file: undefined
        },
        {
            nome: 'Collaudo',
            presenza: "SI",
            file: undefined
        },
    ],
    creatoDa: ""
}