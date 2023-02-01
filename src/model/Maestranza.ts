export interface Maestranza {
    anagrafica: AnagraficaMaestranza,
    documenti: DocumentiMaestranza,
    comunicazioni: ComunicazioniMaestranza
}

export interface AnagraficaMaestranza {
    nome: string,
    cognome: string,
    dataNascita: string,
    luogoNascita: string,
    codiceFiscale: string,
    impresaAppartenenza: string,
    datoreLavoro: boolean
}

export interface DocumentiMaestranza {
    contratto: {
        tipologia: 'Indeterminato' | 'Determinato',
        dataAssunzione?: string,
        dataFineContratto: string,
        mansione?: string,
        file: {name: string, value: string|undefined}
    },
    visitaMedica: {
        effettuataIl: string,
        scadenza: string,
        prescrizioniLimitazioni: string,
        file: {name: string, value: string|undefined}
    },
    corsoFormazioneArt3637: Corso,
    corsoFormazioneCovid: Corso,
    corsoMacchineMovTerra: Corso,
    corsoPonteggi: Corso,
    corsoPLE: Corso,
    corsoConduzioneGRU: Corso,
    corsoGRUSuAutocarro: Corso,
    corsoEscavatoriIdraulici: Corso,
    consegnaDPI: Consegna,
    consegnaDPICovid: Consegna,
    consegnaTesserino: Consegna,
    nominaDaPreposto: Nomina,
    nominaDaRSPP: Nomina,
    nominaDaRLS: Nomina,
    nominaDaAddettoPSoccorso: Nomina,
    nominaDaAddettoPrevIncendi: Nomina,
    corsoPrimoSoccorso: Corso,
    corsoPrevIncendi: Corso,
    corsoPreposto: Corso,
    corsoRLS: Corso,
    corsoRSPP: Corso,
}

export interface ComunicazioniMaestranza {
    telefono?: number,
    cellularePrivato?: number,
    cellulareAziendale?: number,
    email: string
}

interface Corso {
    effettuatoIl: string,
    scadenza: string,
    file: {name: string, value: string|undefined}
}
interface Consegna {
    consegnato: boolean,
    consegnatoIl: string,
    file: {name: string, value: string|undefined}
}
interface Nomina {
    nomina: boolean,
    file: {name: string, value: string|undefined}
}

export const maestranzaDefault: Maestranza = {
    anagrafica: {
        nome: "",
        cognome: "",
        dataNascita: "",
        luogoNascita: "",
        codiceFiscale: "",
        impresaAppartenenza: "",
        datoreLavoro: false
    },
    documenti: {
        contratto: {
            tipologia: "Indeterminato",
            dataAssunzione: undefined,
            dataFineContratto: "",
            mansione: undefined,
            file: {name: "", value: undefined}
        },
        visitaMedica: {
            effettuataIl: "",
            scadenza: "",
            prescrizioniLimitazioni: "",
            file: {name: "", value: undefined}
        },
        corsoFormazioneArt3637: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoFormazioneCovid: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoMacchineMovTerra: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoPonteggi: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoPLE: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoConduzioneGRU: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoGRUSuAutocarro: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoEscavatoriIdraulici: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        consegnaDPI: {
            consegnato: false,
            consegnatoIl: "",
            file: {name: "", value: undefined}
        },
        consegnaDPICovid: {
            consegnato: false,
            consegnatoIl: "",
            file: {name: "", value: undefined}
        },
        consegnaTesserino: {
            consegnato: false,
            consegnatoIl: "",
            file: {name: "", value: undefined}
        },
        nominaDaPreposto: {
            nomina: false,
            file: {name: "", value: undefined}
        },
        nominaDaRSPP: {
            nomina: false,
            file: {name: "", value: undefined}
        },
        nominaDaRLS: {
            nomina: false,
            file: {name: "", value: undefined}
        },
        nominaDaAddettoPSoccorso: {
            nomina: false,
            file: {name: "", value: undefined}
        },
        nominaDaAddettoPrevIncendi: {
            nomina: false,
            file: {name: "", value: undefined}
        },
        corsoPrimoSoccorso: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoPrevIncendi: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoPreposto: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoRLS: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        },
        corsoRSPP: {
            effettuatoIl: "",
            scadenza: "",
            file: {name: "", value: undefined}
        }
    },
    comunicazioni: {
        telefono: undefined,
        cellularePrivato: undefined,
        cellulareAziendale: undefined,
        email: ""
    }
}