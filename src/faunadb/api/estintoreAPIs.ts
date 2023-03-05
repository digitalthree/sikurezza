import faunadb from "faunadb";
import {Estintore} from "../../model/Estintore";

export const createEstintoreInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, estintoreDaSalvare: Estintore) => {
    return await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("Estintori"), {data: estintoreDaSalvare}
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
}

export const getAllEstintoreByCreatoDa = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, creatoDa: string) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(
                    faunaQuery.Match(
                        faunaQuery.Index("get_estintore_by_creatoDa"),
                        creatoDa
                    )
                ),
                faunaQuery.Lambda("estintore", {
                    id: faunaQuery.Select(
                        ["ref", "id"],
                        faunaQuery.Get(
                            faunaQuery.Var("estintore")
                        )
                    ),
                    estintore: faunaQuery.Select(
                        ["data"],
                        faunaQuery.Get(
                            faunaQuery.Var("estintore")
                        )
                    )
                })
            )
        )
    )
    return response as Estintore[];
}

export const updateEstintoreInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, estintoreToUpdate: Estintore) => {
    return await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('Estintori'), estintoreToUpdate.faunaDocumentId), {
            data: {
                ...estintoreToUpdate
            } as Estintore
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))

}

export const deleteEstintoreFromFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, estintoreToDelete: string) => {
    await faunaClient.query(faunaQuery.Delete(faunaQuery.Ref(faunaQuery.Collection('Estintori'), estintoreToDelete)))
}