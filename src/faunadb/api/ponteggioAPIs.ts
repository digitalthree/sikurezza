import faunadb from "faunadb";
import {Ponteggio} from "../../model/Ponteggio";

export const createPonteggioInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, ponteggioDaSalvare: Ponteggio) => {
    return await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("Ponteggi"), {data: ponteggioDaSalvare}
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
}

export const getAllPonteggiByCreatoDa = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, creatoDa: string) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(
                    faunaQuery.Match(
                        faunaQuery.Index("get_ponteggi_by_creatoDa"),
                        creatoDa
                    )
                ),
                faunaQuery.Lambda("ponteggio", {
                    id: faunaQuery.Select(
                        ["ref", "id"],
                        faunaQuery.Get(
                            faunaQuery.Var("ponteggio")
                        )
                    ),
                    ponteggio: faunaQuery.Select(
                        ["data"],
                        faunaQuery.Get(
                            faunaQuery.Var("ponteggio")
                        )
                    )
                })
            )
        )
    )
    return response as Ponteggio[];
}

export const updatePonteggioInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, ponteggioToUpdate: Ponteggio) => {
    return await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('Ponteggi'), ponteggioToUpdate.faunaDocumentId), {
            data: {
                ...ponteggioToUpdate
            } as Ponteggio
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))

}

export const deletePonteggioFromFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, ponteggioToDelete: string) => {
    await faunaClient.query(faunaQuery.Delete(faunaQuery.Ref(faunaQuery.Collection('Ponteggi'), ponteggioToDelete)))
}