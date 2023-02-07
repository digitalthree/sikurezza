
export interface MacchineEAttrezzature {
    nome: string,
    categoria: "Macchina" | "Attrezzatura",
    sottoCategoria: string,
    targa: string,
    documenti: Documento[],
    ultimaRevisione: string,
    scadenza: string
}

export interface Documento {
    nome: string,
    presenza: boolean,
    file: {nome: string, value: File|string|undefined}
}

export const MacchinaOAttrezzaturaDefault: MacchineEAttrezzature = {
    nome: "",
    categoria: "Macchina",
    sottoCategoria: "",
    targa: "",
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
    ultimaRevisione: "",
    scadenza: ""
}