import faunadb from "faunadb";
import {MacchinaEAttrezzatura} from "../../model/MacchineEAttrezzature";

export const createMacchinaEAttrezzaturaInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, macchinaEAttrezzaturaDaSalvare: MacchinaEAttrezzatura) => {
    return await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("MacchineEAttrezzature"), {data: macchinaEAttrezzaturaDaSalvare}
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
}

export const getAllMacchineEAttrezzatureByCreatoDa = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, creatoDa: string) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(
                    faunaQuery.Match(
                        faunaQuery.Index("get_macchinaEAttrezzatura_by_creatoDa"),
                        creatoDa
                    )
                ),
                faunaQuery.Lambda("macchinaEAttrezzatura", {
                    id: faunaQuery.Select(
                        ["ref", "id"],
                        faunaQuery.Get(
                            faunaQuery.Var("macchinaEAttrezzatura")
                        )
                    ),
                    macchinaEAttrezzatura: faunaQuery.Select(
                        ["data"],
                        faunaQuery.Get(
                            faunaQuery.Var("macchinaEAttrezzatura")
                        )
                    )
                })
            )
        )
    )
    return response as MacchinaEAttrezzatura[];
}

export const updateMacchinaEAttrezzaturaInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, macchinaEAttrezzaturaToUpdate: MacchinaEAttrezzatura) => {
    return await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('MacchineEAttrezzature'), macchinaEAttrezzaturaToUpdate.faunaDocumentId), {
            data: {
                ...macchinaEAttrezzaturaToUpdate
            } as MacchinaEAttrezzatura
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))

}

export const deleteMacchinaEAttrezzaturaFromFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, macchinaEAttrezzaturaToDelete: string) => {
    await faunaClient.query(faunaQuery.Delete(faunaQuery.Ref(faunaQuery.Collection('MacchineEAttrezzature'), macchinaEAttrezzaturaToDelete)))
}