import React, {useEffect} from 'react';
import {SelectionAndSearchGrid} from "./components/SelectionAndSearchGrid";
import {AiOutlinePlus} from "react-icons/ai";
import {TableHome} from "./components/TableHome";
import {CreationBoxGrid} from "./components/CreationBoxGrid";
import {useDispatch, useSelector} from "react-redux";
import {CantiereSelezionatoSelector, selezionaCantiere} from "../../../../store/cantiereSlice";
import {Breadcrumb} from "../../../../shared/breadcrumb/Breadcrumb";
import {Cantiere} from "../cantiere/Cantiere";

interface HomeCoordinatoreProps {
    setObjectToCreate: (s: string | undefined) => void
    setBreadcrumbsItems: (s: string[]) => void
}

export const HomeCoordinatore: React.FC<HomeCoordinatoreProps> = (
    {
        setObjectToCreate, setBreadcrumbsItems
    }
) => {

    const dispatch = useDispatch()
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)

    function resetCantiereSelezionato(){
        dispatch(selezionaCantiere(undefined))
    }

    /*useEffect(() => {
        resetCantiereSelezionato()
    }, []);*/


    return (
        <>
            {!cantiereSelezionato &&
                <>
                    <SelectionAndSearchGrid/>
                    <div className="flex mt-32">
                        <TableHome/>
                        <CreationBoxGrid setObjectToCreate={setObjectToCreate} setBreadcrumbsItems={setBreadcrumbsItems}/>
                    </div>
                </>
            }
            {cantiereSelezionato &&
                <>
                    <Breadcrumb breadcrumbsItems={["Home", cantiereSelezionato.nome]} onItemClick={resetCantiereSelezionato}/>
                    <Cantiere setObjectToCreate={setObjectToCreate}/>
                </>
            }
        </>
    )

}