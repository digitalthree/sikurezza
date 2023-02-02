import React, {useEffect, useState} from 'react';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {Header} from "../../../shared/header/Header";
import {CreationFactory} from "../factory/CreationFactory";
import {Breadcrumb} from "../../../shared/breadcrumb/Breadcrumb";
import {useFaunaQuery} from "../../../faunadb/hooks/useFaunaQuery";
import {useDispatch, useSelector} from "react-redux";
import {CantiereSelezionatoSelector, selezionaCantiere} from "../../../store/cantiereSlice";
import {clearOrganizationStorages} from "../../../utils/auth0/auth0";
import {getAllImpreseByCreataDa} from "../../../faunadb/api/impresaAPIs";
import {Impresa} from "../../../model/Impresa";
import {addImpresa, ImpresaSelezionataSelector} from "../../../store/impresaSlice";
import {SelectionAndSearchGrid} from "./components/SelectionAndSearchGrid";
import {TableHome} from "./components/TableHome";
import {CreationBoxGrid} from "./components/CreationBoxGrid";

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
        execQuery(getAllImpreseByCreataDa, user?.email).then(res => {
            res.forEach((r: { id: string, impresa: Impresa; }) => {
                dispatch(addImpresa({
                    ...r.impresa,
                    faunaDocumentId: r.id
                } as Impresa))
            })
        })
    }, []);

    const [objectToCreate, setObjectToCreate] = useState<string|undefined>(undefined);
    const [breadcrumbsItems, setBreadcrumbsItems] = useState(["Home"]);




    return(
        <div className="px-32 py-5">
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
                        <>
                            <Breadcrumb breadcrumbsItems={["Home", impresaSelezionata.anagrafica.denominazione]} onItemClick={resetCantiereSelezionato}/>
                        </>
                    }
                </>
                : (
                    <>
                        <Breadcrumb breadcrumbsItems={breadcrumbsItems} onItemClick={setObjectToCreate}/>
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
