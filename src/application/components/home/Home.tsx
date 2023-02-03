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
import {addImpresa, ImpresaSelezionataSelector} from "../../../store/impresaSlice";
import {SelectionAndSearchGrid} from "./components/SelectionAndSearchGrid";
import {TableHome} from "./components/TableHome";
import {CreationBoxGrid} from "./components/CreationBoxGrid";
import SezioneImpresa from "./components/SezioneImpresa";
import {getAllCantieriByCreatoDa} from "../../../faunadb/api/cantiereAPIs";
import {Cantiere} from "../../../model/Cantiere";
import {getAllMaestranzeByCreatoDa} from "../../../faunadb/api/maestranzaAPIs";
import {Maestranza} from "../../../model/Maestranza";
import {addMaestranza} from "../../../store/maestranzaSlice";

interface CoordinatoreProps {

}

const Home: React.FC<CoordinatoreProps> = ({}) => {


    const {logout, user} = useAuth0();
    const {execQuery} = useFaunaQuery()

    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    function resetCantiereSelezionato(){
        dispatch(selezionaCantiere(undefined))
    }
    const dispatch = useDispatch()

    useEffect(() => {
        execQuery(getAllCantieriByCreatoDa, user?.email).then(res => {
            res.forEach((r: { id: string, cantiere: Cantiere; }) => {
                dispatch(addCantiere({...r.cantiere, faunaDocumentId: r.id}))
                dispatch(addCantiereProxy({...r.cantiere, faunaDocumentId: r.id}))
            })
        })
        execQuery(getAllImpreseByCreataDa, user?.email).then(res => {
            res.forEach((r: { id: string, impresa: Impresa; }) => {
                dispatch(addImpresa({
                    ...r.impresa,
                    faunaDocumentId: r.id
                } as Impresa))
            })
        })
        execQuery(getAllMaestranzeByCreatoDa, user?.email).then(res => {
            res.forEach((r: { id: string, maestranza: Maestranza; }) => {
                dispatch(addMaestranza({
                    ...r.maestranza,
                    faunaDocumentId: r.id
                } as Maestranza))
            })
        })
    }, []);

    const [objectToCreate, setObjectToCreate] = useState<string|undefined>(undefined);
    const [breadcrumbsItems, setBreadcrumbsItems] = useState(["Home"]);




    return(
        <div className="lg:px-32 px-10 py-5">
            <Header/>
            {!objectToCreate
                ? <>
                    {!impresaSelezionata &&
                        <>
                            <SelectionAndSearchGrid/>
                            <div className="flex mt-32">
                                <TableHome/>
                                <CreationBoxGrid setObjectToCreate={setObjectToCreate} setBreadcrumbsItems={setBreadcrumbsItems}/>
                            </div>
                        </>
                    }
                    {impresaSelezionata &&
                        <div>
                            <Breadcrumb breadcrumbsItems={["Home", impresaSelezionata.anagrafica.denominazione]} setObjectToCreate={setObjectToCreate}/>
                            <SezioneImpresa/>
                        </div>
                    }
                </>
                : (
                    <>
                        <Breadcrumb breadcrumbsItems={breadcrumbsItems} setObjectToCreate={setObjectToCreate}/>
                        <CreationFactory objectToCreate={objectToCreate} setObjectToCreate={setObjectToCreate}/>
                    </>

                )
            }

            <button onClick={() => {
                clearOrganizationStorages()
                logout({returnTo: "http://localhost:3000/"})
            }}>
                Log Out
            </button>
        </div>
    )
}

export default withAuthenticationRequired(Home)
