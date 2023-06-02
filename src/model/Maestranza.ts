export interface Maestranza {
    anagrafica: { label: string, value: string|boolean }[],
    documenti: Documento[],
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
    nome: string
    tipologia?: 'Indeterminato' | 'Determinato',
    dataAssunzione?: string,
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
            dataAssunzione: undefined,
            dataFineContratto: "",
            mansione: undefined,
            file: undefined
        },
        {
            nome: 'visitaMedica',
            effettuatoIl: "",
            scadenza: "",
            prescrizioniLimitazioni: "",
            file: undefined
        },
        {
            nome: 'vaccinazioneAntitetanica',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoFormazioneArt37',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoMacchineMovTerra',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPonteggi',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPLE',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoConduzioneGRU',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoGRUSuAutocarro',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoEscavatoriIdraulici',
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
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPrevIncendi',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoPreposto',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoRLS',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        },
        {
            nome: 'corsoRSPP',
            effettuatoIl: "",
            scadenza: "",
            file: undefined
        }
    ],
    comunicazioni: {
        telefono: undefined,
        cellularePrivato: undefined,
        cellulareAziendale: undefined,
        email: ""
    },
    creatoDa: {id: "", nome: ""}
}