import { useState } from "react";
import AnagrafeCantieriTab from "./tabContentFactory/anagrafeCantiere";
import ElettricoCantieriTab from "./tabContentFactory/elettricoCantieri";
import EstintoriCantieriTab from "./tabContentFactory/estintoriCantieri";
import GruCantieriTab from "./tabContentFactory/gruCantieri";
import PonteggioCantieriTab from "./tabContentFactory/ponteggioCantieri";
import SquadraOperativaCantieriTab from "./tabContentFactory/squadraOperativaCantiere";
export interface CreazioneCantieriTabsProps {}

const CreazioneCantiereTabs: React.FC<CreazioneCantieriTabsProps> = ({}) => {
  const [index, setIndex] = useState(0);
  
  return (
    <>
      <div className="flex flex-row w-full h-16 justify-center">
        <img
          src="\img\loghi_schede\prova_logo_azienda.png"
          alt="logo azienda"
        ></img>
      </div>
      <div className="flex justify-center">
        <div className="tabs w-full 2xl:w-10/12 mt-8 flex flex-row justify-center border border-slate-400 rounded-xl shadow-md p-2 md:p-4">
          <button
            className={`tab tab-lifted xl:tab-md mt-2 w-1/2 lg:w-1/3 xl:w-auto ${
              index === 0 ? "tab-active" : "null"
            }`}
            onClick={() => {
              setIndex(0);
            }}
          >
            ANAG. CANTIERE
          </button>
          <button
            className={`tab tab-lifted xl:tab-md mt-2 w-1/2 lg:w-1/3 xl:w-auto ${
              index === 1 ? "tab-active" : "null"
            }`}
            onClick={() => {
              setIndex(1);
            }}
          >
            SQUADRA OPERATIVA
          </button>
          <button
            className={`tab tab-lifted xl:tab-md mt-2 w-3/5 md:w-1/2 lg:w-1/3 xl:w-auto ${
              index === 2 ? "tab-active" : "null"
            }`}
            onClick={() => {
              setIndex(2);
            }}
          >
            GRU / MEZZI DI SOLLEVAMENTO
          </button>
          <button
            className={`tab tab-lifted xl:tab-md mt-2 w-2/5 md:w-1/2 lg:w-1/3 xl:w-auto ${
              index === 3 ? "tab-active" : "null"
            }`}
            onClick={() => {
              setIndex(3);
            }}
          >
            PONTEGGIO
          </button>
          <button
            className={`tab tab-lifted xl:tab-md mt-2 w-1/2 lg:w-1/3 xl:w-auto ${
              index === 4 ? "tab-active" : "null"
            }`}
            onClick={() => {
              setIndex(4);
            }}
          >
            ESTINTORI
          </button>
          <button
            className={`tab tab-lifted xl:tab-md mt-2 w-1/2 lg:w-1/3 xl:w-auto ${
              index === 5 ? "tab-active" : "null"
            }`}
            onClick={() => {
              setIndex(5);
            }}
          >
            IMPIANTO ELETTRICO
          </button>

          <div className="tabs content flex flex-col items-center w-full">
            <div className="py-5 w-full flex flex-row justify-start pl-20 xl:pl-14">
              <img
                src="\img\loghi_schede\logo_cantiere_scheda.png"
                alt="logo cantiere schede"
                className="w-12"
              ></img>
            </div>

            {/* ANAGRAFE CANTIERE */}
            <div hidden={index !== 0} className="w-full">
              <AnagrafeCantieriTab/>
            </div>

            {/* SQUADRA OPERATIVA */}
            <div hidden={index !== 1} className="w-full">
              <SquadraOperativaCantieriTab/>
            </div>

            {/* GRU / MEZZI DI SOLL. */}
            <div hidden={index !== 2} className="w-full">
              <GruCantieriTab/>
            </div>

            {/* PONTEGGIO */}
            <div hidden={index !== 3} className="w-full">
              <PonteggioCantieriTab/>
            </div>

            {/* ESTINTORI */}
            <div hidden={index !== 4} className="w-full">
              <EstintoriCantieriTab/>
            </div>

            {/* IMPIANTO ELETTRICO */}
            <div hidden={index !== 5} className="w-full">
              <ElettricoCantieriTab/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreazioneCantiereTabs;
