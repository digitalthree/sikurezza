import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getAllCantieri } from "../../../dynamodb/api/cantiereAPIs";
import { useDynamoDBQuery } from "../../../dynamodb/hook/useDynamoDBQuery";
import { convertFromDynamoDBFormat } from "../../../dynamodb/utils/conversionFunctions";
import { cantiereDefault, Cantiere } from "../../../model/Cantiere";
import EditButtonCantiere from "../../../shared/tableComponents/EditButtonCantiere";
import { CantieriSelector, resetCantieri, setCantiereDaCreare, selezionaCantiere, addCantiere } from "../../../store/cantiereSlice";
import { resetBreadcrumbItems, addBreadcrumbItem } from "../../../store/impresaSlice";


export interface CantieriTabProps {
}

const Cantieri: React.FC<CantieriTabProps> = () => {

    const cantieri = useSelector(CantieriSelector)
    const dispatch = useDispatch()
    const {execQuery2} = useDynamoDBQuery()
    const [editabile, setEditabile] = useState<boolean>(true)

    useEffect(() => {
        dispatch(resetBreadcrumbItems())
        dispatch(addBreadcrumbItem("Cantieri"))
        dispatch(resetCantieri())
        dispatch(setCantiereDaCreare(cantiereDefault))
        dispatch(selezionaCantiere(undefined))
        execQuery2(getAllCantieri).then((res) => {
            res.Items.forEach((item:any) => {
                let cantiere = convertFromDynamoDBFormat(item) as Cantiere;
                dispatch(
                    addCantiere(cantiere)
                );
            });
        });

    }, [])

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
                                <tr className="link link-hover hover:text-yellow-500" key={c.id}>
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
            </div>
        </>
    );
};

export default Cantieri;

