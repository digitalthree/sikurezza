import React, {useEffect, useState} from "react";
import Select, {OnChangeValue} from "react-select";
import makeAnimated, {MultiValue} from "react-select/animated";
import {TfiSave} from "react-icons/tfi";
import {getMaestranzaById} from "../../../../../faunadb/api/maestranzaAPIs";
import {
    addMaestranzaToMaestranzaSlice,
    MaestranzeSelector,
    resetMaestranzeInMaestranzaSlice
} from "../../../../../store/maestranzaSlice";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector, ImpreseSelector} from "../../../../../store/impresaSlice";
import {useFaunaQuery} from "../../../../../faunadb/hooks/useFaunaQuery";
import {Maestranza} from "../../../../../model/Maestranza";
import {
    CantiereSelezionatoSelector,
    setAttributoAnagrafica,
    setAttributoSquadraOperativa
} from "../../../../../store/cantiereSlice";
import {useLocation} from "react-router-dom";
import {Impresa} from "../../../../../model/Impresa";

export interface SquadraOperativaCantieriProps {
    setIndex: (n: number) => void
}

const SquadraOperativaCantieriTab: React.FC<SquadraOperativaCantieriProps> = ({setIndex}) => {

    const location = useLocation()

    const animatedComponents = makeAnimated({});
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const maestranze = useSelector(MaestranzeSelector)
    const imprese = useSelector(ImpreseSelector)
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)

    const [RLS, setRLS] = useState([{label: "", value: cantiereSelezionato?.squadraOperativa.RLS}])
    const [RLST, setRLST] = useState("")
    const [RSPP, setRSPP] = useState([{label: "", value: cantiereSelezionato?.squadraOperativa.RSPP}])
    const [RSPPT, setRSPPT] = useState("")

    const {execQuery} = useFaunaQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        if (impresaSelezionata?.maestranze.length !== 0) {
            impresaSelezionata?.maestranze.forEach(m => {
                execQuery(getMaestranzaById, m).then(res => {
                    dispatch(addMaestranzaToMaestranzaSlice(res))
                })
            })
        } else {
            dispatch(resetMaestranzeInMaestranzaSlice())
        }
    }, [])

    /* MULTI SELECT PER SCEGLIERE GLI OPERAI NELLA SCHEDA SQUADRA OPERATIVA */
    const operai = maestranze.map(m => {
        return {
            label: `${m.anagrafica.filter(m => m.label === 'nome')[0].value} ${m.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
            value: m
        }
    })

    /* MULTI SELECT PER IMPRESE SUBALPALT. E OPERAI AUTONOMI SCHEDA SQUADRA OPERATIVA */
    const impreseSubAutonomi = imprese.filter(i => i.tipo === "Subappaltatrice").map(im => {
        return {label: im.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value, value: im}
    })

    const onSelectionChange = (e: OnChangeValue<any, any>, label: string) => {
        let maestranze: Maestranza[] = []
        e.forEach((v: any) => maestranze.push(v.value as Maestranza))
        dispatch(setAttributoSquadraOperativa({nome: label, value: maestranze}))
    }

    const onSelectionChangeImpreseSub = (e: OnChangeValue<any, any>, label: string) => {
        let imprese: Impresa[] = []
        e.forEach((v: any) => imprese.push(v.value as Impresa))
        dispatch(setAttributoSquadraOperativa({nome: label, value: imprese}))
    }

    return (
        <>
            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Responsabile Tecnico</span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Operai terminati"}
                            components={animatedComponents}
                            value={cantiereSelezionato.squadraOperativa.responsabileTecnico.map(m => {
                                return {
                                    label: `${m.anagrafica.filter(m => m.label === 'nome')[0].value} ${m.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                                    value: m
                                }
                            })}
                            isMulti
                            options={operai}
                            onChange={(e) => onSelectionChange(e, "Responsabile Tecnico")}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        isMulti
                        options={operai}
                        onChange={(e) => onSelectionChange(e, "Responsabile Tecnico")}
                    />
                }

            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Preposti</span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Operai terminati"}
                            components={animatedComponents}
                            isMulti
                            options={operai}
                            value={cantiereSelezionato.squadraOperativa.preposti.map(m => {
                                return {
                                    label: `${m.anagrafica.filter(m => m.label === 'nome')[0].value} ${m.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                                    value: m
                                }
                            })}
                            onChange={(e) => onSelectionChange(e, "Preposti")}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        isMulti
                        options={operai}
                        onChange={(e) => onSelectionChange(e, "Preposti")}
                    />
                }
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Addetti Primo Soccorso</span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Operai terminati"}
                            components={animatedComponents}
                            isMulti
                            options={operai}
                            value={cantiereSelezionato.squadraOperativa.addettiPrimoSoccorso.map(m => {
                                return {
                                    label: `${m.anagrafica.filter(m => m.label === 'nome')[0].value} ${m.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                                    value: m
                                }
                            })}
                            onChange={(e) => onSelectionChange(e, "Addetti Primo Soccorso")}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        isMulti
                        options={operai}
                        onChange={(e) => onSelectionChange(e, "Addetti Primo Soccorso")}
                    />
                }
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Addetti Antincendio</span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Operai terminati"}
                            components={animatedComponents}
                            isMulti
                            options={operai}
                            value={cantiereSelezionato.squadraOperativa.addettiAntiIncendio.map(m => {
                                return {
                                    label: `${m.anagrafica.filter(m => m.label === 'nome')[0].value} ${m.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                                    value: m
                                }
                            })}
                            onChange={(e) => onSelectionChange(e, "Addetti Antincendio")}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        isMulti
                        options={operai}
                        onChange={(e) => onSelectionChange(e, "Addetti Antincendio")}
                    />
                }
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">RSL</span>
                {cantiereSelezionato && !location.state.editabile ?
                    <>
                        <ul className="ml-5 w-8/12 sm:w-8/12 rounded-md flex">
                            <li className="rounded bg-gray-200 p-2 ml-1">{`${cantiereSelezionato.squadraOperativa.RLS.anagrafica.filter(m => m.label === 'nome')[0].value} ${cantiereSelezionato.squadraOperativa.RLS.anagrafica.filter(m => m.label === 'cognome')[0].value}`}</li>
                        </ul>
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile || RLST.length > 0}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        options={operai}
                        value={cantiereSelezionato?.squadraOperativa.RLS ? {
                            label: `${cantiereSelezionato?.squadraOperativa.RLS.anagrafica.filter(m => m.label === 'nome')[0].value} ${cantiereSelezionato?.squadraOperativa.RLS.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                            value: cantiereSelezionato?.squadraOperativa.RLS
                        } : RLS}
                        onChange={(e) => {
                            if (e) {
                                setRLS([e] as { label: string, value: Maestranza }[])
                                onSelectionChange([e], "RLS")
                            }
                        }}
                    />
                }

            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">RSLT</span>
                {cantiereSelezionato && !location.state.editabile ?
                    <>
                        <ul className="ml-5 w-8/12 sm:w-8/12 rounded-md flex">
                            <li className="rounded bg-gray-200 p-2 ml-1">{cantiereSelezionato.squadraOperativa.RLST}</li>
                        </ul>
                    </>
                    :
                    <input
                        className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
                        disabled={!location.state.editabile}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                            }
                        }}
                        value={cantiereSelezionato && cantiereSelezionato.squadraOperativa.RLST}
                        onChange={(e) => {
                            setRLST(e.target.value)
                            dispatch(setAttributoSquadraOperativa({nome: "RLST", value: e.target.value}))
                        }
                        }
                    />
                }

            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Medico Competente</span>
                {cantiereSelezionato && !location.state.editabile ?
                    <>
                        <ul className="ml-5 w-8/12 sm:w-8/12 rounded-md flex">
                            <li className="rounded bg-gray-200 p-2 ml-1">{cantiereSelezionato.squadraOperativa.medicoCompetente}</li>
                        </ul>
                    </>
                    :
                    <input
                        className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
                        disabled={!location.state.editabile}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                            }
                        }}
                        value={cantiereSelezionato && cantiereSelezionato.squadraOperativa.medicoCompetente}
                        onChange={(e) => {
                            dispatch(setAttributoSquadraOperativa({nome: "Medico Competente", value: e.target.value}))
                        }
                        }
                    />
                }
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">RSPP</span>
                {cantiereSelezionato && !location.state.editabile ?
                    <>
                        <ul className="ml-5 w-8/12 sm:w-8/12 rounded-md flex">
                            <li className="rounded bg-gray-200 p-2 ml-1">{`${cantiereSelezionato.squadraOperativa.RSPP.anagrafica.filter(m => m.label === 'nome')[0].value} ${cantiereSelezionato.squadraOperativa.RSPP.anagrafica.filter(m => m.label === 'cognome')[0].value}`}</li>
                        </ul>
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile || RSPPT.length > 0}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        options={operai}
                        value={cantiereSelezionato?.squadraOperativa.RSPP ? {
                            label: `${cantiereSelezionato?.squadraOperativa.RSPP.anagrafica.filter(m => m.label === 'nome')[0].value} ${cantiereSelezionato?.squadraOperativa.RSPP.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                            value: cantiereSelezionato?.squadraOperativa.RSPP
                        } : RSPP}
                        onChange={(e) => {
                            if (e) {
                                setRSPP([e] as { label: string, value: Maestranza }[])
                                onSelectionChange([e], "RSPP")
                            }
                        }}
                    />
                }
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">RSPPT</span>
                {cantiereSelezionato && !location.state.editabile ?
                    <>
                        <ul className="ml-5 w-8/12 sm:w-8/12 rounded-md flex">
                            <li className="rounded bg-gray-200 p-2 ml-1">{cantiereSelezionato.squadraOperativa.RSPPT}</li>
                        </ul>
                    </>
                    :
                    <input
                        className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
                        disabled={!location.state.editabile || !cantiereSelezionato?.squadraOperativa.RSPP}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                            }
                        }}
                        value={cantiereSelezionato && cantiereSelezionato.squadraOperativa.RSPPT}
                        onChange={(e) => {
                            setRSPPT(e.target.value)
                            dispatch(setAttributoSquadraOperativa({nome: "RSPPT", value: e.target.value}))
                        }
                        }
                    />
                }

            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Delegati Sicurezza</span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Operai terminati"}
                            components={animatedComponents}
                            isMulti
                            options={operai}
                            value={cantiereSelezionato.squadraOperativa.delegatiSicurezza.map(m => {
                                return {
                                    label: `${m.anagrafica.filter(m => m.label === 'nome')[0].value} ${m.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                                    value: m
                                }
                            })}
                            onChange={(e) => onSelectionChange(e, "Delegati Sicurezza")}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        isMulti
                        options={operai}
                        onChange={(e) => onSelectionChange(e, "Delegati Sicurezza")}
                    />
                }
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Squadra Operai</span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Operai terminati"}
                            components={animatedComponents}
                            isMulti
                            options={operai}
                            value={cantiereSelezionato.squadraOperativa.squadraOperai.map(m => {
                                return {
                                    label: `${m.anagrafica.filter(m => m.label === 'nome')[0].value} ${m.anagrafica.filter(m => m.label === 'cognome')[0].value}`,
                                    value: m
                                }
                            })}
                            onChange={(e) => onSelectionChange(e, "Squadra Operai")}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Operai terminati"}
                        components={animatedComponents}
                        isMulti
                        options={operai}
                        onChange={(e) => onSelectionChange(e, "Squadra Operai")}
                    />
                }
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4 font-semibold mb-10"
            >
        <span className="w-4/12 sm:w-4/12">
          Impresa Subappaltatrice e Lavoratori Autonomi
        </span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            isDisabled={!location.state.editabile}
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Terminato"}
                            components={animatedComponents}
                            isMulti
                            options={impreseSubAutonomi}
                            value={cantiereSelezionato.squadraOperativa.impreseSubappaltatrici.map(im => {
                                return {
                                    label: im.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value,
                                    value: im
                                }
                            })}
                            onChange={(e) => onSelectionChangeImpreseSub(e, "Imprese Subappaltatrici")}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        isDisabled={!location.state.editabile}
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Terminato"}
                        components={animatedComponents}
                        isMulti
                        options={impreseSubAutonomi}
                        onChange={(e) => onSelectionChangeImpreseSub(e, "Imprese Subappaltatrici")}
                    />
                }

            </div>

            {location.state.editabile &&
                <div className="flex mt-8 mb-6 mx-auto w-60">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button
                        type="submit"
                        onClick={() => setIndex(2)}
                        className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                    >
                        Salva e Prosegui
                    </button>
                </div>
            }
        </>
    );
};
export default SquadraOperativaCantieriTab;
