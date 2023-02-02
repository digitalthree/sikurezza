import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    CantieriProxySelector,
    CantieriSelector,
    selezionaCantiere, selezionaCantiereProxy,
    trovaCantiereByNomeAndIndirizzo
} from "../../../../store/cantiereSlice";
import {ImpreseSelector, setImpresaSelezionata} from "../../../../store/impresaSlice";

interface TableHomeProps {
}

export const TableHome: React.FC<TableHomeProps> = ({}) => {

    const dispatch = useDispatch()
    const imprese = useSelector(ImpreseSelector)

    return (
        <>
            <div className="overflow-x-auto w-3/5 px-3">
                <table className="table table-zebra w-full">
                    <tbody>
                    {imprese && imprese.map((imp, index) => {
                        return (
                            <tr key={imp.faunaDocumentId}>
                                <td>{`${imp.anagrafica.denominazione}`}</td>
                                <td><span className="hover:cursor-pointer hover:underline"
                                    onClick={() => {
                                        dispatch(setImpresaSelezionata(imp))
                                    }}>apri</span></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )

}