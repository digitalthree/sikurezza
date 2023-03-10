import faunadb from "faunadb";
import {Maestranza} from "../../model/Maestranza";
import {Impresa} from "../../model/Impresa";
import {Estintore} from "../../model/Estintore";

export const createMaestranzaInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, maestranzaDaSalvare: Maestranza) => {
    const response = await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("Maestranze"), {data: maestranzaDaSalvare}
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

export const deleteMaestranzaFromFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, maestranzaToDelete: string) => {
    await faunaClient.query(faunaQuery.Delete(faunaQuery.Ref(faunaQuery.Collection('Maestranze'), maestranzaToDelete)))
}

export const updateMaestranzaInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, maestranzaToUpdate: Maestranza) => {
    return await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('Maestranze'), maestranzaToUpdate.faunaDocumentId), {
            data: {
                ...maestranzaToUpdate
            } as Maestranza
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))

}

export const getAllMaestranzeByCreatoDa = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, creatoDa: string) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(
                    faunaQuery.Match(
                        faunaQuery.Index("get_maestranza_by_creatoDa"),
                        creatoDa
                    )
                ),
                faunaQuery.Lambda("maestranza", {
                    id: faunaQuery.Select(
                        ["ref", "id"],
                        faunaQuery.Get(
                            faunaQuery.Var("maestranza")
                        )
                    ),
                    maestranza: faunaQuery.Select(
                        ["data"],
                        faunaQuery.Get(
                            faunaQuery.Var("maestranza")
                        )
                    )
                })
            )
        )
    )
    return response as Maestranza[];
}

export const getMaestranzaById = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, id: string) => {
    const response = await faunaClient.query(
        faunaQuery.Let({maestranza: faunaQuery.Get(faunaQuery.Match("get_maestranza_by_id", id))},
            faunaQuery.Merge(faunaQuery.Select(["data"], faunaQuery.Var("maestranza")),
                {faunaDocumentId: faunaQuery.Select(["ref", "id"], faunaQuery.Var("maestranza"))}
            )
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response as Maestranza
}