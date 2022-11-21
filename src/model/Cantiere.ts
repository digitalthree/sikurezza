import {Impresa} from "./Impresa";

export interface Cantiere {
    nome: string,
    indirizzo: string,
    civico: number,
    cap: number,
    comune: string,
    responsabileLavori: string,
    impresaAffidataria: string | Impresa
    impreseSubappaltatrici: (string | Impresa)[]
    creatoDa: string,
    faunaDocumentId?: string
}