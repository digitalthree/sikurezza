import React, {useEffect, useState} from "react";
import EditButtonEstintore from "../../shared/tableComponents/EditButtonEstintore";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../store/impresaSlice";
import {addGru, resetGru} from "../../store/gruSlice";
import {getAllGruByCreatoDa} from "../../faunadb/api/gruAPIs";
import {Gru} from "../../model/Gru";
import {
    addCantiere,
    CantieriSelector,
    resetCantieri,
    selezionaCantiere,
    setCantiereDaCreare
} from "../../store/cantiereSlice";
import {useFaunaQuery} from "../../faunadb/hooks/useFaunaQuery";
import {getAllCantieriByCreatoDa} from "../../faunadb/api/cantiereAPIs";
import {Cantiere, cantiereDefault} from "../../model/Cantiere";
import EditButtonCantiere from "../../shared/tableComponents/EditButtonCantiere";

export interface CantieriTabProps {
}

const CantieriTab: React.FC<CantieriTabProps> = () => {

    const navigate = useNavigate();
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const cantieri = useSelector(CantieriSelector)
    const dispatch = useDispatch()
    const {execQuery} = useFaunaQuery()
    const [editabile, setEditabile] = useState<boolean>(true)

    useEffect(() => {
        dispatch(resetCantieri())
        dispatch(setCantiereDaCreare(cantiereDefault))
        dispatch(selezionaCantiere(undefined))
        execQuery(getAllCantieriByCreatoDa, impresaSelezionata?.faunaDocumentId).then((res) => {
            res.forEach((c: { id: string; cantiere: Cantiere }) => {
                dispatch(
                    addCantiere({
                        ...c.cantiere,
                        faunaDocumentId: c.id,
                    } as Cantiere)
                );
            });
        });

    }, [impresaSelezionata])

    return (
        <>
            <div className="flex flex-col justify-center items-center w-100">
                <div className="flex flex-row justify-center w-10/12 sm:w-8/12 md:w-6/12 xl:w-5/12">
                    <img
                        src="\img\loghi_schede\logo_cantieri.png"
                        className="pt-2 w-full"
                        alt="cantieri logo"
                    ></img>
                </div>
                <div
                    className="flex-col text-xl sm:text-2xl md:text-3xl text-center py-5 text-zinc-400 font-semibold underline">
                    MENU' CANTIERI
                </div>
                <div className="flex flex-row w-full justify-center items-center mt-2 mb-5">
                    <input
                        type="text"
                        placeholder="Cerca"
                        className="w-3/5 sm:w-2/5 px-5 input input-sm rounded-full border border-zinc-400 focus:border-0 "
                    />
                    <select
                        className=" w-2/5 sm:w-1/5 select select-sm ml-5 px-5 rounded-full border border-zinc-400 focus:border-0 ">
                        <option disabled selected>
                            Ordina per
                        </option>
                        <option>Nome</option>
                        <option>Città</option>
                    </select>
                </div>
                <div className="overflow-x-auto overflow-y-hidden w-full mt-3 border-t-zinc-300 border rounded-xl">
                    <table className="table table-zebra w-full ">
                        <tbody>
                        {/* row 1 */}
                        {cantieri.map((c, index) => {
                            return(
                                <tr className="link link-hover hover:text-sky-500" key={c.faunaDocumentId}>
                                    <th>{index+1}</th>
                                    <td>{c.anagrafica.attr.filter(a => a.nome === 'denominazione')[0].value}</td>
                                    <td>{c.anagrafica.attr.filter(a => a.nome === 'indirizzo')[0].value}</td>
                                    <td>
                                        <EditButtonCantiere cantiereTarget={c} setEditabile={setEditabile}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button
                        className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300"
                        onClick={() => {
                          navigate(`/impresa/${impresaSelezionata?.faunaDocumentId}/cantiere`, {
                            state: {
                              editabile: true,
                              modifica: false
                            }
                          })
                        }}>
                        <span className="mr-2">+</span>Aggiungi Cantiere
                    </button>
                </div>
            </div>
        </>
    );
};

export default CantieriTab;

