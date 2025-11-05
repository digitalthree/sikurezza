export interface Ponteggio {
    attr: {nome: string, value: string|boolean|">20m"|"<20m", label: string}[],
    allegatiPonteggio: AllegatoPonteggio[],
    controlli: ControlloPonteggio[]
    id?: string,
    creatoDa: string
}

export interface AllegatoPonteggio {
    nome: string,
    presenza: boolean | "SI" | "NO" | "NR",
    file: File|string|undefined
}

export interface ControlloPonteggio {
    nome: string,
    effettuato: boolean,
    data: string,
    file: File|string|undefined
}

export const ponteggioDefault: Ponteggio = {
    attr: [
        {nome: 'cantiere', value: "", label: 'Cantiere'},
        {nome: 'proprieta', value: false, label: 'Proprietà'},
        {nome: 'noleggiatore', value: "", label: 'Noleggiatore'},
        {nome: 'installatore', value: "", label: 'Installatore'},
        {nome: 'altezzaPonteggio', value: "<20m", label: 'Altezza Ponteggio'},
        {nome: 'piuDiUnMarchio', value: false, label: 'Più di un marchio'},
        {nome: 'piuDiUnaTipologia', value: false, label: 'Più di una tipologia'},
        {nome: 'tipologia', value: "", label: 'Tipologia'},
        {nome: 'marca', value: "", label: 'Marca'},
        {nome: 'tecnicoProgettistaDelPonteggio', value: "", label: 'Tecnico Progettista del Ponteggio'},
        {nome: 'partenzaRistretta', value: false, label: 'Partenza Ristretta'},
        {nome: 'passiCarrai', value: false, label: 'Passi Carrai'},
        {nome: 'piazzoleDiCarico', value: false, label: 'Piazzole Di Carico'},
    ],
    allegatiPonteggio: [
        {
            nome: "Progetto del ponteggio",
            presenza: "NO",
            file: undefined
        },
        {
            nome: "Relazione di calcolo",
            presenza: "NO",
            file: undefined
        },
        {
            nome: "Autorizzazioni ministeriali per ogni marchio",
            presenza: false,
            file: undefined
        },
        {
            nome: "Pi.M.U.S.",
            presenza: false,
            file: undefined
        },
        {
            nome: "Registro di controllo",
            presenza: false,
            file: undefined
        },
        {
            nome: "Autorizzazione d'uso del ponteggio da parte dell'installatore",
            presenza: false,
            file: undefined
        }
    ],
    controlli: [
        {nome: "Controlli periodici", effettuato: false, data: "", file: undefined},
        {nome: "Controllo straordinario", effettuato: false, data: "", file: undefined}
    ],
    creatoDa: ""

}