import React, {useEffect, useRef} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TfiClip, TfiSave } from "react-icons/tfi";
import userEvent from "@testing-library/user-event";
import {getMaestranzaById} from "../../../../../faunadb/api/maestranzaAPIs";
import {addMaestranzaToMaestranzaSlice, resetMaestranzeInMaestranzaSlice} from "../../../../../store/maestranzaSlice";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../../store/impresaSlice";
import {addGru, GruSelector, resetGru} from "../../../../../store/gruSlice";
import {getAllGruByCreatoDa} from "../../../../../faunadb/api/gruAPIs";
import {Gru} from "../../../../../model/Gru";
import {useFaunaQuery} from "../../../../../faunadb/hooks/useFaunaQuery";

export interface GruCantieriProps {}

const GruCantieriTab: React.FC<GruCantieriProps> = ({}) => {
  const animatedComponents = makeAnimated();
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
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
   

  return (
    <>
      <div
        className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">
          Mezzi di sollevamento installati
        </span>
        <Select
          className="ml-5 w-8/12 sm:w-8/12 rounded-md"
          placeholder="Seleziona"
          noOptionsMessage={() => "Gru /M.S. terminate"}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={gru}
        />
      </div>



      <div
        className="flex flex-col md:flex-row w-full mx-auto lg:w-10/12 xl:w-9/12 2xl:w-8/12 
                              justify-center items-center my-4 mt-12 text-right leading-4 font-semibold"
      >
        <span className="w-full text-center md:text-right my-3 md:w-4/12 flex flex-col">Verifiche periodiche (AUSL)<i className="font-light text-sm mt-1">(Trascorsi 2 anni dalla messa in esercizio)</i></span>
        <div className="w-full md:w-7/12 border-slate-300 border-y flex flex-row sm:ml-3">
          <div className="flex flex-col w-7/12 text-center mt-2">
            <span className="border-slate-300 border-b font-normal py-2">
              13/12/2023
            </span>
            <span className="font-normal text-left p-2 leading-5">
              Oggi il controllo effettuato è stato sufficente per proseguire i
              lavori
            </span>
          </div>
          <div className="divider divider-horizontal py-2"></div>
          <div className="flex flex-col w-5/12 text-center my-2 justify-evenly">
          <input
            type="file"
            className="file-input file-input-secondary file-input-sm w-full"
          />
          <button className="btn btn-sm btn-disabled border-0 text-white">
              Esporta Nota
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-8 mb-6 mx-auto w-60">
        <div className="rounded-bl rounded-tl bg-amber-600 p-2">
          <TfiSave size="30px" className="text-white" />
        </div>
        <button
          type="submit"
          className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
        >
          Salva e Prosegui
        </button>
        </div>
    </>
  );
};
export default GruCantieriTab;
