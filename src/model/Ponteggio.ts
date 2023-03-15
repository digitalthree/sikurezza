export interface Ponteggio {
    attr: {nome: string, value: string|boolean|">20m"|"<20m", label: string}[],
    allegatiPonteggio: AllegatoPonteggio[],
    controlli: ControlloPonteggio[]
    faunaDocumentId?: string,
    creatoDa: string
}

export interface AllegatoPonteggio {
    nome: string,
    presenza: boolean | "SI" | "NO" | "NR",
    file: {nome: string, value: File|string|undefined}
}

export interface ControlloPonteggio {
    nome: string,
    effettuato: boolean,
    data: string,
    file: {nome: string, value: File|string|undefined}
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
            file: {nome: "", value: undefined}
        },
        {
            nome: "Relazione di calcolo",
            presenza: "NO",
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
    controlli: [
        {nome: "Controlli periodici", effettuato: false, data: "", file: {nome: "", value: undefined}},
        {nome: "Controllo straordinario", effettuato: false, data: "", file: {nome: "", value: undefined}}
    ],
    creatoDa: ""

}