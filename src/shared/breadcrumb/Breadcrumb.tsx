import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector, setImpresaSelezionata} from "../../store/impresaSlice";

interface BreadcrumbProps {
    breadcrumbsItems: string[],
    setObjectToCreate: Function
}

export const Breadcrumb: React.FC<BreadcrumbProps> = (
    {
        breadcrumbsItems, setObjectToCreate
    }
) => {

    const dispatch = useDispatch()
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    return(
        <div className="text-sm breadcrumbs">
            <ul>
                {breadcrumbsItems.map(bi => {
                    if(bi === "Home"){
                        return <li key={bi} onClick={() => {
                            if(impresaSelezionata){
                                dispatch(setImpresaSelezionata(undefined))
                            }else{
                                setObjectToCreate(undefined)
                            }
                        }} className="hover:cursor-pointer">{bi}</li>
                    }else{
                        return <li key={bi} className="font-bold">{bi}</li>
                    }
                })}
            </ul>
        </div>
    )

}