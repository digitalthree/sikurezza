export interface Maestranza {
    anagrafica: { label: string, value: string|boolean }[],
    documenti: Documento[],
    corsi: Corso[]
    comunicazioni: ComunicazioniMaestranza,
    creatoDa: { id: string, nome: string }
    faunaDocumentId?: string
}


export interface ComunicazioniMaestranza {
    telefono?: number,
    cellularePrivato?: number,
    cellulareAziendale?: number,
    email: string
}

export interface Documento {
    nome: string,
    richiedibile?: boolean,
    tipologia?: 'Indeterminato' | 'Determinato',
    dataFineContratto?: string,
    mansione?: string,
    effettuatoIl?: string,
    scadenza?: string,
    prescrizioniLimitazioni?: string,
    consegnato?: boolean,
    consegnatoIl?: string,
    nomina?: boolean,
    file: string|File|undefined
}

export interface Corso {
    nome: string,
    label: string,
    richiedibile: boolean,
    scadenza: string,
    file: string|File|undefined
}


export const maestranzaDefault: Maestranza = {
    anagrafica: [
        {label: 'nome', value: ''},
        {label: 'cognome', value: ''},
        {label: 'dataNascita', value: ''},
        {label: 'luogoNascita', value: ''},
        {label: 'codiceFiscale', value: ''},
        {label: 'impresaAppartenenza', value: ''},
        {label: 'datoreLavoro', value: false},
    ],
    documenti: [
        {
            nome: 'contratto',
            tipologia: "Indeterminato",
            dataFineContratto: "",
            mansione: undefined,
            file: undefined
        },
        {
            nome: 'visitaMedica',
            scadenza: "",
            prescrizioniLimitazioni: "",
            file: undefined
        },
        {
            nome: 'corsoFormazioneArt37',
            richiedibile: true,
            scadenza: "",
            file: undefined
        },
        {
            nome: 'vaccinazioneAntitetanica',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'consegnaDPI',
            consegnato: false,
            consegnatoIl: "",
            file: undefined
        },
        {
            nome: 'informazioneLavoratoreArt.36',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'consegnaTesserino',
            consegnato: false,
            consegnatoIl: "",
            file: undefined
        },
        {
            nome: 'nominaDaPreposto',
            nomina: false,
            file: undefined
        },
        {
            nome: 'nominaDaRSPP',
            nomina: false,
            file: undefined
        },
        {
            nome: 'nominaDaRLS',
            nomina: false,
            file: undefined
        },
        {
            nome: 'nominaDaAddettoPSoccorso',
            nomina: false,
            file: undefined
        },
        {
            nome: 'nominaDaAddettoPrevIncendi',
            nomina: false,
            file: undefined
        },
        {
            nome: 'corsoPrimoSoccorso',
            richiedibile: true,
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPrevIncendi',
            richiedibile: true,
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPreposto',
            richiedibile: true,
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoRLS',
            richiedibile: true,
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoRSPP',
            richiedibile: true,
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        }
    ],
    corsi: [
        {
            nome: 'corsoMacchineMovTerra',
            label: 'Corso Macchine Mov. Terra',
            richiedibile: true,
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPonteggi',
            label: 'Corso Ponteggi',
            richiedibile: true,
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPLE',
            label: 'Corso PLE',
            richiedibile: true,
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoConduzioneGRU',
            label: 'Corso Conduzione GRU',
            richiedibile: true,
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoGRUSuAutocarro',
            label: 'Corso GRU Su Autocarro',
            richiedibile: true,
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoEscavatoriIdraulici',
            label: 'Corso Escavatori Idraulici',
            richiedibile: true,
            scadenza: "",
            file: undefined
        },
    ],
    comunicazioni: {
        telefono: undefined,
        cellularePrivato: undefined,
        cellulareAziendale: undefined,
        email: ""
    },
    creatoDa: {id: "", nome: ""}
}