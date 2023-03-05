export interface Estintore {
    nome: string,
    cantiere: string,
    matricola: number,
    numero: number,
    dataUltimaRevisione: string,
    scadenza: string,
    creatoDa: string,
    faunaDocumentId?: string
}

export const estintoreDefault: Estintore = {
    nome: "",
    cantiere: "",
    matricola: 0,
    numero: 0,
    dataUltimaRevisione: "",
    scadenza: "",
    creatoDa: "",
}