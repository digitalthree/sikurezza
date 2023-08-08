import React, {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {TfiClip, TfiSave} from "react-icons/tfi";
import {addPonteggio, PonteggioSelector, resetPonteggio} from "../../../../../store/ponteggioSlice";
import {getAllPonteggiByCreatoDa} from "../../../../../faunadb/api/ponteggioAPIs";
import {Ponteggio} from "../../../../../model/Ponteggio";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../../store/impresaSlice";
import {GruSelector} from "../../../../../store/gruSlice";
import {useFaunaQuery} from "../../../../../faunadb/hooks/useFaunaQuery";
import {ControlloCantiere} from "../../../../../model/Cantiere";
import {Gru} from "../../../../../model/Gru";
import {
    CantiereSelezionatoSelector,
    setControlloCantierePonteggio,
    setGruInCantiere,
    setPonteggioInCantiere
} from "../../../../../store/cantiereSlice";
import InputFile from "../../../../../shared/Files/InputFile";
import VisualizzaEliminaFile from "../../../../../shared/Files/VisualizzaEliminaFile";
import Nota from "./components/Nota";
import {useLocation} from "react-router-dom";

export interface PonteggioCantieriProps {
    setIndex: (n: number) => void
}

const PonteggioCantieriTab: React.FC<PonteggioCantieriProps> = ({setIndex}) => {
    const animatedComponents = makeAnimated();
    const location = useLocation()
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)
    const ponteggiFromStore = useSelector(PonteggioSelector)
    const dispatch = useDispatch()
    const {execQuery} = useFaunaQuery()

    useEffect(() => {
        dispatch(resetPonteggio())

        execQuery(getAllPonteggiByCreatoDa, impresaSelezionata?.faunaDocumentId).then((res) => {
            res.forEach((p: { id: string; ponteggio: Ponteggio }) => {
                dispatch(
                    addPonteggio({
                        ...p.ponteggio,
                        faunaDocumentId: p.id,
                    } as Ponteggio)
                );
            });
        });

    }, [impresaSelezionata])

    /* MULTI SELECT PER SCEGLIERE I PONTEGGI */
    const ponteggio = ponteggiFromStore.map(p => {
        return {label: `${p.attr.filter(a => a.nome === "marca")[0].value} - ${p.attr.filter(a => a.nome === "tipologia")[0].value}`, value: p}
    })

    const [controlliPeriodici, setControlliPeriodici] = useState<ControlloCantiere[]>(cantiereSelezionato ? cantiereSelezionato?.ponteggi.controlliPeriodici : [])

    return (
        <>
            <div
                className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
        <span className="w-4/12 sm:w-4/12">
          Ponteggi
        </span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Gru /M.S. terminate"}
                            components={animatedComponents}
                            isMulti
                            options={ponteggio}
                            value={cantiereSelezionato.ponteggi.listaPonteggi.map(p => {
                                return {label: `${p.attr.filter(a => a.nome === "marca")[0].value} - ${p.attr.filter(a => a.nome === "tipologia")[0].value}`, value: p}
                            })}
                            onChange={(e) => {
                                let ponteggi: Ponteggio[] = []
                                e.forEach((v: any) => ponteggi.push(v.value as Ponteggio))
                                dispatch(setPonteggioInCantiere(ponteggi))
                            }}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Gru /M.S. terminate"}
                        components={animatedComponents}
                        isMulti
                        options={ponteggio}
                        onChange={(e) => {
                            let ponteggi: Ponteggio[] = []
                            e.forEach((v: any) => ponteggi.push(v.value as Ponteggio))
                            dispatch(setPonteggioInCantiere(ponteggi))
                        }}
                    />
                }
            </div>

            <Nota controlliPeriodici={controlliPeriodici} setControlliPeriodici={setControlliPeriodici}
                  label={"Controlli Periodici"}/>


            {location.state.editabile &&
                <div className="flex mt-8 mb-6 mx-auto w-60">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button
                        type="submit"
                        className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                        onClick={() => {
                            dispatch(setControlloCantierePonteggio(controlliPeriodici))
                            setIndex(4)
                        }}
                    >
                        Salva e Prosegui
                    </button>
                </div>
            }
        </>
    );
};
export default PonteggioCantieriTab;
