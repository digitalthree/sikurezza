import React, {useEffect, useState} from 'react';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {Header} from "../../shared/header/Header";
import {HomeCoordinatore} from "./components/home/HomeCoordinatore";
import {CreationFactory} from "./factory/CreationFactory";
import {Breadcrumb} from "../../shared/breadcrumb/Breadcrumb";
import {useFaunaQuery} from "../../faunadb/hooks/useFaunaQuery";
import {getAllCantieriByCreatoDa} from "../../faunadb/api/cantiereAPIs";
import {useDispatch} from "react-redux";
import {addCantiere, addCantiereProxy} from "../../store/cantiereSlice";
import {Cantiere} from "../../model/Cantiere";
import {clearOrganizationStorages} from "../../utils/auth0/auth0";
import {getAllImprese} from "../../faunadb/api/impresaAPIs";
import {Impresa} from "../../model/Impresa";
import {addImpresa} from "../../store/impresaSlice";

interface CoordinatoreProps {
}

const Coordinatore: React.FC<CoordinatoreProps> = ({}) => {


    const {logout, user} = useAuth0();
    const {execQuery} = useFaunaQuery()

    const dispatch = useDispatch()

    useEffect(() => {
        execQuery(getAllCantieriByCreatoDa, user?.email).then(res => {
            res.forEach((r: { id: string, cantiere: Cantiere; }) => {
                dispatch(addCantiere({...r.cantiere, faunaDocumentId: r.id}))
                dispatch(addCantiereProxy({...r.cantiere, faunaDocumentId: r.id}))
            })
        })
        execQuery(getAllImprese).then(res => {
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
                ? <HomeCoordinatore setObjectToCreate={setObjectToCreate} setBreadcrumbsItems={setBreadcrumbsItems}/>
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
                Log Out Coordinatore
            </button>
        </div>
    )
}

export default withAuthenticationRequired(Coordinatore)
