export interface Ponteggio {
    cantiere: string,
    proprieta: boolean,
    noleggiatore: string,
    installatore: string //id dell'impresa
    altezzaPonteggio: ">20m"|"<20m",
    piuDiUnMarchio: boolean,
    piuDiUnaTipologia: boolean,
    tipologia: string,
    marca: string,
    progettoDelPonteggio: {
        nome: string,
        presenza: "SI"|"NO"|"NR",
        file: {nome: string, value: File|string|undefined}
    },
    tecnicoProgettistaDelPonteggio: string
    relazioneDiCalcolo: {
        nome: string,
        presenza: "SI"|"NO"|"NR",
        file: {nome: string, value: File|string|undefined}
    },
    allegatiPonteggio: AllegatoPonteggio[],
    partenzaRistretta: boolean,
    passiCarrai: boolean,
    piazzoleDiCarico: boolean,
    controlloPeriodico: {
        nome: string,
        effettuato: boolean,
        data: string,
        file: {nome: string, value: File|string|undefined}
    },
    controlloStraordinario: {
        nome: string,
        effettuato: boolean,
        data: string,
        file: {nome: string, value: File|string|undefined}
    },
}

export interface AllegatoPonteggio {
    nome: string,
    presenza: boolean,
    file: {nome: string, value: File|string|undefined}
}

export const ponteggioDefault: Ponteggio = {
    cantiere: "",
    proprieta: false,
    noleggiatore: "",
    installatore: "",
    altezzaPonteggio: "<20m",
    piuDiUnMarchio: true,
    piuDiUnaTipologia: true,
    tipologia: "",
    marca: "",
    progettoDelPonteggio: {
        nome: "Progetto del ponteggio",
        presenza: "NO",
        file: {nome: "", value: undefined}
    },
    relazioneDiCalcolo: {
        nome: "Progetto del ponteggio",
        presenza: "NO",
        file: {nome: "", value: undefined}
    },
    tecnicoProgettistaDelPonteggio: "",
    allegatiPonteggio: [
        {
            nome: "Relazione di calcolo",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Autorizzazioni ministeriali per ogni marchio",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Pi.M.U.S.",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Registro di controllo",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Autorizzazione d'uso del ponteggio da parte dell'installatore",
            presenza: false,
            file: {nome: "", value: undefined}
        }
    ],
    partenzaRistretta: false,
    passiCarrai: false,
    piazzoleDiCarico: false,
    controlloPeriodico: {
        nome: "Controlli periodici",
        effettuato: false,
        data: "",
        file: {nome: "", value: undefined}
    },
    controlloStraordinario: {
        nome: "Controlli periodici",
        effettuato: false,
        data: "",
        file: {nome: "", value: undefined}
    }

}