import React, {useEffect} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TfiSave } from "react-icons/tfi";
import {getMaestranzaById} from "../../../../../faunadb/api/maestranzaAPIs";
import {
    addMaestranzaToMaestranzaSlice,
    MaestranzeSelector,
    resetMaestranzeInMaestranzaSlice
} from "../../../../../store/maestranzaSlice";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector, ImpreseSelector} from "../../../../../store/impresaSlice";
import {useFaunaQuery} from "../../../../../faunadb/hooks/useFaunaQuery";

export interface SquadraOperativaCantieriProps {}

const SquadraOperativaCantieriTab: React.FC<
  SquadraOperativaCantieriProps
> = ({}) => {

  const animatedComponents = makeAnimated();
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
  const maestranze = useSelector(MaestranzeSelector)
  const imprese = useSelector(ImpreseSelector)

  const {execQuery} = useFaunaQuery()
  const dispatch = useDispatch()

  useEffect(() => {
      if(impresaSelezionata?.maestranze.length !== 0){
          impresaSelezionata?.maestranze.forEach(m => {
              execQuery(getMaestranzaById, m).then(res => {
                  dispatch(addMaestranzaToMaestranzaSlice(res))
              })
          })
      }else{
          dispatch(resetMaestranzeInMaestranzaSlice())
      }
  }, [])

  /* MULTI SELECT PER SCEGLIERE GLI OPERAI NELLA SCHEDA SQUADRA OPERATIVA */
  const operai = maestranze.map(m => {
      return {label: `${m.anagrafica.nome} ${m.anagrafica.cognome}`, value: m}
  })

   /* MULTI SELECT PER IMPRESE SUBALPALT. E OPERAI AUTONOMI SCHEDA SQUADRA OPERATIVA */
   const impreseSubAutonomi = imprese.filter(i => i.tipo === "Subappaltatrice").map(im => {
       return {label: im.anagrafica.denominazione, value: im}
   })


  return (
    <>
      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Responsabile Tecnico</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Preposto 1</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Preposto 2</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Addetto Primo Soccorso</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Addetto Antincendio</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">RSL</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Medico Competente</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">RSPP</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Delegato Sicurezza</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Squadra Operai</span>
        <Select
          className="ml-5 w-8/12 sm:w-8/12 rounded-md"
          placeholder="Seleziona"
          noOptionsMessage={() => "Operai terminati"}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={operai}
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold mb-10"
      >
        <span className="w-4/12 sm:w-4/12">
          Impresa Subappaltatrice e Lavoratori Autonomi
        </span>
        <Select
          className="ml-5 w-8/12 sm:w-8/12 rounded-md"
          placeholder="Seleziona"
          noOptionsMessage={() => "Terminato"}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={impreseSubAutonomi}
        />
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
export default SquadraOperativaCantieriTab;
