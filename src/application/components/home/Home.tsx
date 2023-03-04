import React, {useEffect, useState} from 'react';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {Header} from "../../../shared/header/Header";
import {CreationFactory} from "../factory/CreationFactory";
import {Breadcrumb} from "../../../shared/breadcrumb/Breadcrumb";
import {useFaunaQuery} from "../../../faunadb/hooks/useFaunaQuery";
import {useDispatch, useSelector} from "react-redux";
import {
    addCantiere,
    addCantiereProxy,
    CantiereSelezionatoSelector,
    selezionaCantiere
} from "../../../store/cantiereSlice";
import {clearOrganizationStorages} from "../../../utils/auth0/auth0";
import {getAllImpreseByCreataDa} from "../../../faunadb/api/impresaAPIs";
import {Impresa} from "../../../model/Impresa";
import {
    addImpresa,
    ImpresaSelezionataSelector,
    ImpreseSelector,
    setImpresaSelezionata
} from "../../../store/impresaSlice";
import {SelectionAndSearchGrid} from "./components/SelectionAndSearchGrid";
import {TableHome} from "./components/TableHome";
import {CreationBoxGrid} from "./components/CreationBoxGrid";
import SezioneImpresa from "./components/SezioneImpresa";
import {getAllCantieriByCreatoDa} from "../../../faunadb/api/cantiereAPIs";
import {Cantiere} from "../../../model/Cantiere";
import {getAllMaestranzeByCreatoDa} from "../../../faunadb/api/maestranzaAPIs";
import {Maestranza} from "../../../model/Maestranza";
import {addMaestranza} from "../../../store/maestranzaSlice";
import {AiOutlinePlus} from "react-icons/ai";
import {CreazioneImpresa} from "../factory/creazioneImpresa/CreazioneImpresa";
import {useNavigate} from "react-router-dom";
import { HeaderImpresa } from '../../../shared/header/HeaderImpresa';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({}) => {


    const {logout, user} = useAuth0();
    const {execQuery} = useFaunaQuery()

    const imprese = useSelector(ImpreseSelector)


    const navigate = useNavigate()


    function resetCantiereSelezionato() {
        dispatch(selezionaCantiere(undefined))
    }

    const dispatch = useDispatch()

    useEffect(() => {
        /*execQuery(getAllCantieriByCreatoDa, user?.email).then(res => {
            res.forEach((r: { id: string, cantiere: Cantiere; }) => {
                dispatch(addCantiere({...r.cantiere, faunaDocumentId: r.id}))
                dispatch(addCantiereProxy({...r.cantiere, faunaDocumentId: r.id}))
            })
        })*/
        if(imprese.length === 0){
            execQuery(getAllImpreseByCreataDa, user?.email).then(res => {
                res.forEach((r: { id: string, impresa: Impresa; }) => {
                    dispatch(addImpresa({
                        ...r.impresa,
                        faunaDocumentId: r.id
                    } as Impresa))
                })
            })
        }

        /*execQuery(getAllMaestranzeByCreatoDa, user?.email).then(res => {
            res.forEach((r: { id: string, maestranza: Maestranza; }) => {
                dispatch(addMaestranza({
                    ...r.maestranza,
                    faunaDocumentId: r.id
                } as Maestranza))
            })
        })*/
    }, []);

    const [objectToCreate, setObjectToCreate] = useState<string | undefined>(undefined);
    const [breadcrumbsItems, setBreadcrumbsItems] = useState(["Home"]);


    return (
        <>
        <HeaderImpresa/>
            {imprese.length === 0 ?
                <>
                    <CreazioneImpresa setObjectToCreate={setObjectToCreate} primoAccesso={true}/>
                </>
                :
                <>
                    <div className="flex flex-col items-center">
                        <div className="grid grid-cols-4 mt-20 mb-20 gap-8 flex items-center">
                            <div
                                className="col-span-1 bg-amber-100 p-5 rounded-3xl h-full w-full flex justify-center flex-col items-center hover:cursor-pointer hover:underline text-amber-500"
                                onClick={() => {
                                    dispatch(setImpresaSelezionata(imprese.filter(i => i.tipo === "Affidataria")[0]))
                                    navigate('/impresa')
                                }}
                            >
                            <span className="font-semibold text-3xl uppercase text-center">
                                {imprese.filter(i => i.tipo === "Affidataria")[0].anagrafica.denominazione}
                            </span>
                            </div>
                            <div className="col-span-3 h-full w-full">
                                <div className="grid grid-cols-5 gap-8">
                                    {imprese.filter(i => i.tipo === "Subappaltatrice").map(is => {
                                        return (
                                            <div
                                                key={(is as Impresa).faunaDocumentId}
                                                className="bg-gray-300 rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60"
                                                onClick={() => {
                                                    dispatch(setImpresaSelezionata(is))
                                                    navigate('/impresa')
                                                }}
                                            >
                                                <span className="text-white font-semibold text-xl uppercase text-center">{(is as Impresa).anagrafica && (is as Impresa).anagrafica.denominazione}</span>
                                                <span className="text-white font-semibold text-sm uppercase text-center mt-5">Impresa Subappaltatrice</span>
                                            </div>
                                        )
                                    })}

                                    <div
                                        className="bg-gray-300 rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60"
                                        onClick={() => {
                                            setObjectToCreate("Impresa")
                                            navigate('/creazione/impresa')
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
                        <button onClick={() => {
                            clearOrganizationStorages()
                            logout({returnTo: "http://localhost:3000/"})
                        }}>
                            Log Out
                        </button>
                    </div>

                </>
            }
        </>

    )
}

export default withAuthenticationRequired(Home)
