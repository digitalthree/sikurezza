import faunadb from "faunadb";
import {Maestranza} from "../../model/Maestranza";

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