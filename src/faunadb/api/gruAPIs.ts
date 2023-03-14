import faunadb from "faunadb";
import {Gru} from "../../model/Gru";

export const createGruInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, gruDaSalvare: Gru) => {
    return await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("Gru"), {data: gruDaSalvare}
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
}

export const getAllGruByCreatoDa = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, creatoDa: string) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(
                    faunaQuery.Match(
                        faunaQuery.Index("get_gru_by_creatoDa"),
                        creatoDa
                    )
                ),
                faunaQuery.Lambda("gru", {
                    id: faunaQuery.Select(
                        ["ref", "id"],
                        faunaQuery.Get(
                            faunaQuery.Var("gru")
                        )
                    ),
                    gru: faunaQuery.Select(
                        ["data"],
                        faunaQuery.Get(
                            faunaQuery.Var("gru")
                        )
                    )
                })
            )
        )
    )
    return response as Gru[];
}

export const updateGruInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, gruToUpdate: Gru) => {
    return await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('Gru'), gruToUpdate.faunaDocumentId), {
            data: {
                ...gruToUpdate
            } as Gru
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))

}

export const deleteGruFromFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, gruToDelete: string) => {
    await faunaClient.query(faunaQuery.Delete(faunaQuery.Ref(faunaQuery.Collection('Gru'), gruToDelete)))
}