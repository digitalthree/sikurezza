import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TfiClip, TfiSave } from "react-icons/tfi";

export interface EstintoriCantieriProps {}

const EstintoriCantieriTab: React.FC<EstintoriCantieriProps> = ({}) => {
  const animatedComponents = makeAnimated();

  /* MULTI SELECT PER SCEGLIERE GLI ESTINTORI */
  const estintori = [
    { label: "Estintore 1", value: "Estintore 1" },
    { label: "Estintore 2", value: "Estintore 2" },
    { label: "Estintore 3", value: "Estintore 3" },
    { label: "Estintore 4", value: "Estintore 4" },
    { label: "Estintore 5", value: "Estintore 5" },
  ];

  return (
    <>
      <div
        className="mx-auto flex flex-row w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 
                              justify-center items-center my-2 text-right leading-4 font-semibold"
      >
        <span className="w-4/12 sm:w-4/12">Estintori in uso</span>
        <Select
          className="ml-5 w-8/12 sm:w-8/12 rounded-md"
          placeholder="Seleziona"
          noOptionsMessage={() => "Estintori terminati"}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={estintori}
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
export default EstintoriCantieriTab;
