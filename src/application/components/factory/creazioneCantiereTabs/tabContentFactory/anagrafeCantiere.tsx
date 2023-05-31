import React from "react";
import { TfiSave } from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {
    CantiereDaCreareSelector,
    CantiereSelezionatoSelector,
    setAttributoAnagrafica
} from "../../../../../store/cantiereSlice";
import {useLocation} from "react-router-dom";

export interface AnagrafeCantieriTabProps {
    setIndex: (n:number) => void
}

const AnagrafeCantieriTab: React.FC<AnagrafeCantieriTabProps> = ({setIndex}) => {

    const dispatch = useDispatch()
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)
    const cantiereDaCreare = useSelector(CantiereDaCreareSelector)
    const location = useLocation()

  return (
    <>
        {cantiereDaCreare.anagrafica.attr.map(a => {
            return(
                <div
                    className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12
                              justify-center items-center my-2 text-right leading-4"
                >
                    <span className="w-4/12 sm:w-4/12 font-semibold">{a.label}</span>
                    <input
                        className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
                        disabled={!location.state.editabile}
                        value={(cantiereSelezionato) ? cantiereSelezionato.anagrafica.attr.filter(at => at.nome === a.nome)[0].value : a.value}
                        onChange={(e) => dispatch(setAttributoAnagrafica({nome: a.nome, value: e.target.value}))}
                    />
                </div>
            )
        })}
        {location.state.editabile &&
            <div className="flex mt-8 mb-6 mx-auto w-60">
                <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                    <TfiSave size="30px" className="text-white" />
                </div>

                <button
                    onClick={() => setIndex(1)}
                    className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                >
                    Salva e Prosegui
                </button>
            </div>
        }

    </>
  );
};
export default AnagrafeCantieriTab;
