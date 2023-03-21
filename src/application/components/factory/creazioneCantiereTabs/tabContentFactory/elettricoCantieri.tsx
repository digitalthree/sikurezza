import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TfiClip, TfiSave } from "react-icons/tfi";
import { useState } from "react";

export interface ElettricoCantieriProps {}

const ElettricoCantieriTab: React.FC<ElettricoCantieriProps> = ({}) => {
  const animatedComponents = makeAnimated();

  /* MULTI SELECT PER SCEGLIERE LE IMPRESE ESECUTRICI */
  const impresa = [
    { label: "Impresa 1", value: "Impresa 1" },
    { label: "Impresa 2", value: "Impresa 2" },
    { label: "Impresa 3", value: "Impresa 3" },
    { label: "Impresa 4", value: "Impresa 4" },
    { label: "Impresa 5", value: "Impresa 5" },
  ];

  return (
    <>
      <div
        className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 
                              justify-center items-center my-3 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">
          Imprese esecutrici delle opere elettriche
        </span>
        <span className="text-red-600 font-bold text-2xl">*</span>
        <Select
          className="ml-5 w-8/12 sm:w-8/12 rounded-md"
          placeholder="Seleziona"
          noOptionsMessage={() => "Imprese terminate"}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={impresa}
          required={true}
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 
                              justify-center items-center my-3 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Preposto impresa esecutrice</span>
        <input
          type="text"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 
                              justify-center items-center my-3 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Telefono</span>
        <input
          type="tel"
          className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
        />
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
      >
        <span className="w-12/12 md:w-4/12">
          Dichiarazione di Conformità Imp. El.
        </span>
        <div className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
          <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
            NO
            <input type="checkbox" name="conformita" className="toggle mx-2" />
            SI
          </div>
          <input
            type="file"
            className="file-input file-input-secondary file-input-sm w-6/12 md:w-7/12"
          />
        </div>
      </div>

      
      <div
        className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
      >
        <span className="w-12/12 md:w-4/12">
          Relazione con tipologia materiali
        </span>
        <div className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
          <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
            NO
            <input type="checkbox" name="conformita" className="toggle mx-2" />
            SI
          </div>
          <input
            type="file"
            className="file-input file-input-secondary file-input-sm w-6/12 md:w-7/12"
          />
        </div>
      </div>


      <div
        className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
      >
        <span className="w-12/12 md:w-4/12">
          Schema di impianto realizzato
        </span>
        <div className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
          <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
            NO
            <input type="checkbox" name="conformita" className="toggle mx-2" />
            SI
          </div>
          <input
            type="file"
            className="file-input file-input-secondary file-input-sm w-6/12 md:w-7/12"
          />
        </div>
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
      >
        <span className="w-12/12 md:w-4/12">
        Visura CCIAA <i className="text-xs font-light">(art. 1 DM 22/1/08 n37)</i>
        </span>
        <div className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
          <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
            NO
            <input type="checkbox" name="conformita" className="toggle mx-2" />
            SI
          </div>
          <input
            type="file"
            className="file-input file-input-secondary file-input-sm w-6/12 md:w-7/12"
          />
        </div>
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
      >
        <span className="w-12/12 md:w-4/12">
          Denuncia dell'impianto
        </span>
        <div className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
          <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
            NO
            <input type="checkbox" name="conformita" className="toggle mx-2" />
            SI
          </div>
          <div
            className="w-6/12 md:w-7/12"
          />
        </div>
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
      >
        <span className="w-12/12 md:w-4/12">
          Valutazione del rischio di Fulminazione
        </span>
        <div className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
          <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
            NO
            <input type="checkbox" name="conformita" className="toggle mx-2" />
            SI
          </div>
          <input
            type="file"
            className="file-input file-input-secondary file-input-sm w-6/12 md:w-7/12"
          />
        </div>
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
      >
        <span className="w-12/12 md:w-3/12 lg:w-4/12">
          Esito
        </span>
        <div className="w-full my-3 md:my-0 md:w-9/12 lg:w-8/12 flex flex-row justify-evenly md:justify-end lg:justify-around xl:justify-between items-center">
          <div className="w-6/12  md:w-5/12 flex flex-row justify-center items-center text-right">
            Non Protetto
            <input type="checkbox" name="conformita" className="toggle mx-2" />
            Protetto
          </div>
          <input
            type="file"
            className="file-input file-input-secondary file-input-sm w-5/12 md:w-6/12 lg:w-7/12"
          />
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row w-full mx-auto lg:w-10/12 xl:w-9/12 2xl:w-8/12 
                              justify-center items-center my-4 mt-12 text-right leading-4 font-semibold"
      >
        <span className="w-full text-center md:text-right my-3 md:w-4/12 flex flex-col">Registro di Controlli<i className="font-light mt-1 text-sm">(Mensili e semestrali)</i></span>
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
          </div>
        </div>
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
export default ElettricoCantieriTab;
