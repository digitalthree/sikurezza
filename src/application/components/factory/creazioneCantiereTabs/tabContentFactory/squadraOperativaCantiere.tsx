import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TfiSave } from "react-icons/tfi";

export interface SquadraOperativaCantieriProps {}

const SquadraOperativaCantieriTab: React.FC<
  SquadraOperativaCantieriProps
> = ({}) => {

  const animatedComponents = makeAnimated();

  /* MULTI SELECT PER SCEGLIERE GLI OPERAI NELLA SCHEDA SQUADRA OPERATIVA */
  const operai = [
    { label: "Gino Pasticcio", value: "Gino Pasticcio" },
    { label: "Gino Torta", value: "Gino Torta" },
    { label: "Gino Porchetta", value: "Gino Porchetta" },
    { label: "Gino Pasta", value: "Gino Pasta" },
    { label: "Gino Pastafrolla", value: "Gino Pastafrolla" },
  ];

   /* MULTI SELECT PER IMPRESE SUBALPALT. E OPERAI AUTONOMI SCHEDA SQUADRA OPERATIVA */
   const impreseSubAutonomi = [
    { label: "Impresa1", value: "Impresa1" },
    { label: "Impresa2", value: "Impresa2" },
    { label: "Impresa3", value: "Impresa3" },
    { label: "Impresa4", value: "Impresa4" },
    { label: "Impresa5", value: "Impresa5" },
  ];


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
