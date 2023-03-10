import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector, setImpresaSelezionata} from "../../store/impresaSlice";
import {useNavigate} from "react-router-dom";
import {Impresa} from "../../model/Impresa";
import {setMaestranzaSelezionata} from "../../store/maestranzaSlice";

interface BreadcrumbProps {
    breadcrumbsItems: (string | Impresa)[],
    setBreadcrumbsItems: (v: (string|Impresa)[]) => void,
    setObjectToCreate: Function
}

export const Breadcrumb: React.FC<BreadcrumbProps> = (
    {
        breadcrumbsItems, setBreadcrumbsItems, setObjectToCreate
    }
) => {

    const dispatch = useDispatch()
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const navigate = useNavigate()

    return (
        <div className="text-sm breadcrumbs">
            <ul>
                {breadcrumbsItems.map((bi, index) => {
                    if (bi === "Home") {
                        return <li key={bi} onClick={() => {
                            if (impresaSelezionata) {
                                dispatch(setImpresaSelezionata(undefined))
                                dispatch(setMaestranzaSelezionata(undefined))
                            } else {
                                setObjectToCreate(undefined)
                            }
                            navigate('/')
                        }} className="hover:cursor-pointer">{bi}</li>
                    } else if (typeof bi !== 'string') {
                        return <li key={bi.faunaDocumentId}
                                   className={`${index === breadcrumbsItems.length - 1 ? 'font-bold' : ' hover:cursor-pointer'}`}
                                   onClick={() => {
                                       setObjectToCreate(undefined)
                                       dispatch(setMaestranzaSelezionata(undefined))
                                       setBreadcrumbsItems(["Home", bi])
                                       navigate(`/impresa/${bi.faunaDocumentId}`)
                                   }}
                        >{bi.anagrafica.denominazione}</li>
                    } else {
                        return <li key={bi}
                                   className={`${index === breadcrumbsItems.length - 1 && 'font-bold'}`}>{bi}</li>
                    }
                })}
            </ul>
        </div>
    )

}