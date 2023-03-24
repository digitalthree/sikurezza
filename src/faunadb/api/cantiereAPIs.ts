import faunadb from "faunadb";
import {Cantiere} from "../../model/Cantiere";

export const createCantiereInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, cantiereDaSalvare: Cantiere) => {
    const response = await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("Cantieri"), {data: cantiereDaSalvare}
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response
}


export const getAllCantieriByCreatoDa = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, creatoDa: string) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(
                    faunaQuery.Match(
                        faunaQuery.Index("get_all_cantieri"),
                        creatoDa
                    )
                ),
                faunaQuery.Lambda("cantiere", {
                    id: faunaQuery.Select(
                        ["ref", "id"],
                        faunaQuery.Get(
                            faunaQuery.Var("cantiere")
                        )
                    ),
                    cantiere: faunaQuery.Select(
                        ["data"],
                        faunaQuery.Get(
                            faunaQuery.Var("cantiere")
                        )
                    )
                })
            )
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response as Cantiere[]
}

export const updateCantiereInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, cantiereToUpdate: Cantiere) => {
    return await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('Cantieri'), cantiereToUpdate.faunaDocumentId), {
            data: {
                ...cantiereToUpdate
            } as Cantiere
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))

}

export const deleteCantiereFromFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, cantiereToDelete: string) => {
    await faunaClient.query(faunaQuery.Delete(faunaQuery.Ref(faunaQuery.Collection('Cantieri'), cantiereToDelete)))
}