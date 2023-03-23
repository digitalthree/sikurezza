import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export interface AssistenzaProps {}

const Assistenza: React.FC<AssistenzaProps> = ({}) => {
  return (
    <>
      <form className="w-full flex flex-col pt-5 md:pt-24 items-end">
        <div className="flex flex-col w-full md:w-10/12 xl:w-8/12 2xl:w-7/12">
          <div className="flex flex-row justify-center items-center">
            <label className="w-6/12 text-sm md:text-base text-right font-semibold mb-4 mr-4">
              Impresa
            </label>
            <input
              type="text"
              className="input input-sm text-right shadow-md border-1 border-zinc-300 focus:outline-none mb-4 w-full"
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <label className="w-6/12 text-sm md:text-base text-right font-semibold mb-4 mr-4">
              Nome Operatore
            </label>
            <input
              type="text"
              className="input input-sm text-right border-1 shadow-md border-zinc-300 focus:outline-none mb-4 w-full"
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <label className="w-6/12 text-sm md:text-base text-right font-semibold mb-4 mr-4">
              Mail
            </label>
            <input
              type="email"
              className="input input-sm text-right border-1 shadow-md border-zinc-300 focus:outline-none mb-4 w-full"
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <label className="w-6/12 text-sm md:text-base text-right font-semibold mb-10 mr-4">
              Telefono
            </label>
            <input
              type="tel"
              className="input input-sm text-right border-1 shadow-md border-zinc-300 focus:outline-none mb-10 w-full"
            />
          </div>
        </div>
        <textarea
          className="textarea text-right w-full md:w-10/12 border-1 shadow-md border-zinc-300 focus:outline-none mb-4 min-h-[200px]"
          placeholder="Inserisci il messaggio"
        ></textarea>
        <input
          type="submit"
          value="Invia"
          className="btn btn-wide btn-sm text-black bg-zinc-300 border-0 hover:btn-secondary"
        />
      </form>
    </>
  );
};

export default Assistenza;
