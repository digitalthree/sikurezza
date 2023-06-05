import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {TfiSave} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../../store/impresaSlice";
import {addGru, GruSelector, resetGru} from "../../../../../store/gruSlice";
import {getAllGruByCreatoDa} from "../../../../../faunadb/api/gruAPIs";
import {Gru} from "../../../../../model/Gru";
import {useFaunaQuery} from "../../../../../faunadb/hooks/useFaunaQuery";
import {
    CantiereSelezionatoSelector,
    setControlloCantiereGru,
    setGruInCantiere
} from "../../../../../store/cantiereSlice";
import {ControlloCantiere} from "../../../../../model/Cantiere";
import Nota from "./components/Nota";
import {useLocation} from "react-router-dom";

export interface GruCantieriProps {
    setIndex: (n: number) => void
}

const GruCantieriTab: React.FC<GruCantieriProps> = ({setIndex}) => {
    const location = useLocation()
    const animatedComponents = makeAnimated();
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)
    const gruFromStore = useSelector(GruSelector)
    const dispatch = useDispatch()
    const {execQuery} = useFaunaQuery()

    useEffect(() => {
        dispatch(resetGru())

        execQuery(getAllGruByCreatoDa, impresaSelezionata?.faunaDocumentId).then((res) => {
            res.forEach((g: { id: string; gru: Gru }) => {
                dispatch(
                    addGru({
                        ...g.gru,
                        faunaDocumentId: g.id,
                    } as Gru)
                );
            });
        });

    }, [impresaSelezionata])

    /* MULTI SELECT PER SCEGLIERE LE GRU */
    const gru = gruFromStore.map(g => {
        return {label: g.attr.filter(a => a.nome === "tipologia")[0].value, value: g}
    })

    const [controlliPeriodici, setControlliPeriodici] = useState<ControlloCantiere[]>(cantiereSelezionato ? cantiereSelezionato?.gruMezziDiSollevamento.controlliPeriodici : [])


    return (
        <>
            <div
                className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
        <span className="w-4/12 sm:w-4/12">
          Mezzi di sollevamento installati
        </span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Gru /M.S. terminate"}
                            components={animatedComponents}
                            isMulti
                            options={gru}
                            value={cantiereSelezionato.gruMezziDiSollevamento.listaGru.map(g => {
                                return {label: g.attr.filter(a => a.nome === "tipologia")[0].value, value: g}
                            })}
                            onChange={(e) => {
                                let gru: Gru[] = []
                                e.forEach((v: any) => gru.push(v.value as Gru))
                                dispatch(setGruInCantiere(gru))
                            }}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Gru /M.S. terminate"}
                        components={animatedComponents}
                        isMulti
                        options={gru}
                        onChange={(e) => {
                            let gru: Gru[] = []
                            e.forEach((v: any) => gru.push(v.value as Gru))
                            dispatch(setGruInCantiere(gru))
                        }}
                    />
                }

            </div>


            <Nota controlliPeriodici={controlliPeriodici} setControlliPeriodici={setControlliPeriodici} label={"Controlli Periodici"}/>

            {location.state.editabile &&
                <div className="flex mt-8 mb-6 mx-auto w-60">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button
                        type="submit"
                        className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                        onClick={() => {
                            dispatch(setControlloCantiereGru(controlliPeriodici))
                            setIndex(3)
                        }}
                    >
                        Salva e Prosegui
                    </button>
                </div>
            }
        </>
    );
};
export default GruCantieriTab;
