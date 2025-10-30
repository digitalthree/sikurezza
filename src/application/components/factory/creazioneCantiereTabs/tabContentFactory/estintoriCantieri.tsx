import React, {useEffect} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {TfiSave} from "react-icons/tfi";
import {addEstintore, EstintoriSelector, resetEstintori} from "../../../../../store/estintoreSlice";
import {Estintore} from "../../../../../model/Estintore";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../../store/impresaSlice";
import {CantiereSelezionatoSelector, setEstintoreInCantiere} from "../../../../../store/cantiereSlice";
import {useLocation} from "react-router-dom";
import { useDynamoDBQuery } from "../../../../../dynamodb/hook/useDynamoDBQuery";
import { getAllEstintoreByCreatoDa } from "../../../../../dynamodb/api/estintoreAPIs";
import { convertFromDynamoDBFormat } from '../../../../../dynamodb/utils/conversionFunctions';

export interface EstintoriCantieriProps {
    setIndex: (n: number) => void
}

const EstintoriCantieriTab: React.FC<EstintoriCantieriProps> = ({setIndex}) => {
    const animatedComponents = makeAnimated();

    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)
    const estintoriFromStore = useSelector(EstintoriSelector)
    const dispatch = useDispatch()
    const location = useLocation()
    const {execQuery2} = useDynamoDBQuery()

    useEffect(() => {
        dispatch(resetEstintori())

        execQuery2(getAllEstintoreByCreatoDa, impresaSelezionata?.id).then((res) => {
            res.Items.forEach((item:any) => {
                let estintore = convertFromDynamoDBFormat(item) as Estintore;
                dispatch(
                    addEstintore(estintore)
                );
            });
        });

    }, [impresaSelezionata])

    /* MULTI SELECT PER SCEGLIERE GLI ESTINTORI */
    const estintori = estintoriFromStore.map(e => {
        return {label: e.nome, value: e}
    })

    return (
        <>
            <div
                className="mx-auto flex flex-row w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12
                              justify-center items-center my-2 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Estintori in uso</span>
                {cantiereSelezionato ?
                    <>
                        <Select
                            className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                            placeholder="Seleziona"
                            noOptionsMessage={() => "Estintori terminati"}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={estintori}
                            value={cantiereSelezionato.estintori.map(e => {
                                return {label: e.nome, value: e}
                            })}
                            onChange={(e) => {
                                let estintori: Estintore[] = []
                                e.forEach((v: any) => estintori.push(v.value as Estintore))
                                dispatch(setEstintoreInCantiere(estintori))
                            }}
                        />
                    </>
                    :
                    <Select
                        className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                        placeholder="Seleziona"
                        noOptionsMessage={() => "Estintori terminati"}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={estintori}
                        onChange={(e) => {
                            let estintori: Estintore[] = []
                            e.forEach((v: any) => estintori.push(v.value as Estintore))
                            dispatch(setEstintoreInCantiere(estintori))
                        }}
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
                        className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                        onClick={() => setIndex(5)}
                    >
                        Salva e Prosegui
                    </button>
                </div>
            }

        </>
    );
};
export default EstintoriCantieriTab;
