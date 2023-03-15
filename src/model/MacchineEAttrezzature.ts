
export interface MacchinaEAttrezzatura {
    attr: {nome: string, value: string | ("Macchina" | "Attrezzatura"), label: string}[]
    documenti: DocumentoMacchinaEAttrezzatura[],
    ultimaRevisione: {nome: string, effettuataIl: string, scadenza: string, label: string},
    faunaDocumentId?: string,
    creatoDa: string
}

export interface DocumentoMacchinaEAttrezzatura {
    nome: string,
    presenza: boolean,
    file: {nome: string, value: File|string|undefined},
}

export const macchinaEAttrezzaturaDefault: MacchinaEAttrezzatura = {
    attr: [
        {nome: 'denominazione', value: '', label: 'Denominazione'},
        {nome: 'categoria', value: 'Macchina', label: 'Categoria'},
        {nome: 'sottoCategoria', value: '', label: 'Sotto Categoria'},
        {nome: 'targa', value: '', label: 'Targa'},
    ],
    documenti: [
        {
            nome: "Dichiarazione di Conformità",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Marcatura CE",
            presenza: false,
            file: {nome: "", value: undefined}
        },
        {
            nome: "Libretto",
            presenza: false,
            file: {nome: "", value: undefined}
        }
    ],
    ultimaRevisione: {nome: 'ultimaRevisione', effettuataIl: '', scadenza: '', label: "Ultima Revisione del"},
    creatoDa: ""
}