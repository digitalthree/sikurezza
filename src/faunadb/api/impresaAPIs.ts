import faunadb from "faunadb";
import {Impresa} from "../../model/Impresa";

export const createImpresaInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, impresaDaSalvare: Impresa) => {
    const response = await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("Imprese"), {data: impresaDaSalvare}
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

export const getAllImprese = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(
                    faunaQuery.Match(
                        faunaQuery.Index("get_all_imprese"),
                    )
                ),
                faunaQuery.Lambda("impresa", {
                    id: faunaQuery.Select(
                        ["ref", "id"],
                        faunaQuery.Get(
                            faunaQuery.Var("impresa")
                        )
                    ),
                    impresa: faunaQuery.Select(
                        ["data"],
                        faunaQuery.Get(
                            faunaQuery.Var("impresa")
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
    return response as Impresa[]
}

export const getImpresaById = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, id: string) => {
    const response = await faunaClient.query(
        faunaQuery.Let({impresa: faunaQuery.Get(faunaQuery.Match("get_impresa_by_id", id))},
            faunaQuery.Merge(faunaQuery.Select(["data"], faunaQuery.Var("impresa")),
                {faunaDocumentId: faunaQuery.Select(["ref", "id"], faunaQuery.Var("impresa"))}
            )
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response as Impresa
}