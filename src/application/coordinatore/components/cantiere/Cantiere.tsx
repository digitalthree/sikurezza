import React, {useEffect, useState} from 'react';
import {useFaunaQuery} from "../../../../faunadb/hooks/useFaunaQuery";
import {useDispatch, useSelector} from "react-redux";
import {
    CantiereSelezionatoSelector,
    selezionaCantiere,
    setImpresaAffidatariaOnCantiere, setImpresaSubOnCantiere
} from "../../../../store/cantiereSlice";
import {getImpresaById} from "../../../../faunadb/api/impresaAPIs";
import {Impresa} from "../../../../model/Impresa";
import {AiOutlinePlus} from "react-icons/ai";

interface CantiereProps {
    setObjectToCreate: (s: string | undefined) => void
}

export const Cantiere: React.FC<CantiereProps> = ({setObjectToCreate}) => {

    const dispatch = useDispatch()
    const cantiere = useSelector(CantiereSelezionatoSelector)
    const [impresaAffidataria, setImpresaAffidataria] = useState<Impresa | undefined>(undefined);
    const [impreseSub, setImpreseSub] = useState<Impresa[]>([]);

    const {execQuery} = useFaunaQuery()

    useEffect(() => {
        if(typeof cantiere?.impresaAffidataria === "string"){
            execQuery(getImpresaById, cantiere?.impresaAffidataria).then(res => {
                dispatch(setImpresaAffidatariaOnCantiere({cantiere: cantiere?.indirizzo as string, impresa: res}))
                setImpresaAffidataria(res)
            })
        }else{
            setImpresaAffidataria(cantiere?.impresaAffidataria)
        }
    }, []);

    useEffect(() => {
        let impreseSubArray: Impresa[] = [];
        (cantiere) && cantiere.impreseSubappaltatrici.forEach(is => {
            if(typeof is === "string"){
                console.log(is)
                execQuery(getImpresaById, is).then(res => {
                    dispatch(setImpresaSubOnCantiere({cantiere: cantiere.indirizzo, impresa: res}))
                    impreseSubArray.push(res)
                })
            }else{
                impreseSubArray.push(is)
            }
        })
        setImpreseSub(impreseSubArray)
    }, [cantiere]);



    return (
        <>
            {impresaAffidataria &&
                <div className="flex flex-col items-center">
                    <h3 className="text-4xl py-10 uppercase underline">{`Cantiere - ${cantiere?.nome} - ${cantiere?.comune}`}</h3>
                    <div className="grid grid-cols-4 mt-20 mb-20 gap-8 flex items-center">
                        <div
                            className="col-span-1 bg-amber-100 p-5 rounded-3xl h-full w-full flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60">
                            <span
                                className="text-amber-500 font-semibold text-3xl uppercase text-center">{cantiere?.impresaAffidataria && (cantiere?.impresaAffidataria as Impresa).anagrafica && (cantiere?.impresaAffidataria as Impresa).anagrafica.denominazione}</span>
                            <span className="text-amber-500 font-semibold text-sm uppercase text-center mt-4">Impresa Affidataria</span>
                        </div>
                        <div className="col-span-3 h-full w-full">
                            <div className="grid grid-cols-5 gap-8">
                                {impreseSub.map(is => {
                                    return (
                                        <div
                                            key={(is as Impresa).faunaDocumentId}
                                            className="bg-gray-300 rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60">
                                            <span className="text-white font-semibold text-xl uppercase text-center">{(is as Impresa).anagrafica && (is as Impresa).anagrafica.denominazione}</span>
                                            <span
                                                className="text-white font-semibold text-sm uppercase text-center mt-5">Impresa Subappaltatrice</span>
                                        </div>
                                    )
                                })}

                                <div
                                    className="bg-gray-300 rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60"
                                    onClick={() => {
                                        //dispatch(selezionaCantiere(undefined))
                                        setObjectToCreate("Impresa")
                                    }}
                                >
                                    <AiOutlinePlus size="50px" className="text-white"/>
                                    <span
                                        className="text-white font-semibold text-center mt-3">Aggiungi impresa sub</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3"></div>
                    </div>
                </div>
            }

        </>
    )

}