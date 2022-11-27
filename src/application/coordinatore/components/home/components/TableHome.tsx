import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    CantieriProxySelector,
    CantieriSelector,
    selezionaCantiere, selezionaCantiereProxy,
    trovaCantiereByNomeAndIndirizzo
} from "../../../../../store/cantiereSlice";

interface TableHomeProps {
}

export const TableHome: React.FC<TableHomeProps> = ({}) => {

    const dispatch = useDispatch()
    const cantieriProxy = useSelector(CantieriProxySelector)
    const cantieri = useSelector(CantieriSelector)

    return (
        <>
            <div className="overflow-x-auto w-3/5 px-3">
                <table className="table table-zebra w-full">
                    <tbody>
                    {cantieriProxy && cantieriProxy.map((c, index) => {
                        return (
                            <tr key={c.indirizzo}>
                                <td>{`${c.nome} - ${c.responsabileLavori} - ${c.comune}, ${c.indirizzo}, ${c.cap}`}</td>
                                <td><span className="hover:cursor-pointer hover:underline"
                                    onClick={() => {
                                        if(cantieri[index].faunaDocumentId === c.faunaDocumentId){
                                            dispatch(selezionaCantiere(cantieri[index]))
                                        }
                                        dispatch(selezionaCantiereProxy(c))
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