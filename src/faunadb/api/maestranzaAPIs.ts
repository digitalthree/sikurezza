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