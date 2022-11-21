import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CantieriSelector, selezionaCantiere, trovaCantiereByNomeAndIndirizzo} from "../../../../../store/cantiereSlice";

interface TableHomeProps {
}

export const TableHome: React.FC<TableHomeProps> = ({}) => {

    const dispatch = useDispatch()
    const cantieri = useSelector(CantieriSelector)

    return (
        <>
            <div className="overflow-x-auto w-3/5 px-3">
                <table className="table table-zebra w-full">
                    <tbody>
                    {cantieri && cantieri.map(c => {
                        return (
                            <tr key={c.indirizzo}>
                                <td>{`${c.nome} - ${c.responsabileLavori} - ${c.comune}, ${c.indirizzo}, ${c.cap}`}</td>
                                <td><span className="hover:cursor-pointer hover:underline"
                                    onClick={() => {
                                        dispatch(selezionaCantiere(c))
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