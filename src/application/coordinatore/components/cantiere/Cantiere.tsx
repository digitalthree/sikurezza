import React, {useEffect} from 'react';
import {useFaunaQuery} from "../../../../faunadb/hooks/useFaunaQuery";
import {useDispatch, useSelector} from "react-redux";
import {CantiereSelezionatoSelector, setImpresaAffidatariaOnCantiere} from "../../../../store/cantiereSlice";
import {getImpresaById} from "../../../../faunadb/api/impresaAPIs";
import {Impresa} from "../../../../model/Impresa";
import {AiOutlinePlus} from "react-icons/ai";

interface CantiereProps {
}

export const Cantiere: React.FC<CantiereProps> = ({}) => {

    const dispatch = useDispatch()
    const cantiere = useSelector(CantiereSelezionatoSelector)

    const {execQuery} = useFaunaQuery()

    useEffect(() => {
        execQuery(getImpresaById, cantiere?.impresaAffidataria).then(res => {
            dispatch(setImpresaAffidatariaOnCantiere({cantiere: cantiere?.indirizzo as string, impresa: res}))
        })
    }, []);


    return (
        <>
            <div className="flex flex-col items-center">
                <h3 className="text-4xl py-10 uppercase underline">{`Cantiere - ${cantiere?.nome} - ${cantiere?.comune}`}</h3>
                <div className="grid grid-cols-4 mt-20 mb-20 gap-8 flex items-center">
                    <div
                        className="col-span-1 bg-amber-100 rounded-3xl h-full w-full flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60">
                        <span className="text-amber-500 font-semibold text-3xl uppercase text-center">Pierorazio Costruzioni</span>
                        <span className="text-amber-500 font-semibold text-sm uppercase text-center mt-4">Impresa Affidataria</span>
                    </div>
                    <div className="col-span-3 h-full w-full">
                        <div className="grid grid-cols-5 gap-8">
                            {cantiere?.impreseSubappaltatrici.map(is => {
                                return(
                                    <div
                                        className="bg-gray-300 rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60">
                                        <span className="text-white font-semibold text-xl uppercase text-center">Pierorazio Costruzioni</span>
                                        <span className="text-white font-semibold text-sm uppercase text-center mt-5">Impresa Subappaltatrice</span>
                                    </div>
                                )
                            })}

                            <div
                                className="bg-gray-300 rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60">
                                <AiOutlinePlus size="50px" className="text-white"/>
                                <span className="text-white font-semibold text-center mt-3">Aggiungi impresa sub</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3"></div>
                </div>
            </div>
        </>
    )

}