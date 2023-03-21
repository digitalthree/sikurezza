import React, { useState } from "react";
import { CreazioneImpresa } from "../../factory/creazioneImpresa/CreazioneImpresa";
import { Breadcrumb } from "../../../../shared/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import { ImpresaSelezionataSelector } from "../../../../store/impresaSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { Impresa } from "../../../../model/Impresa";

export interface SezioneImpresaProps {}

const SezioneImpresa: React.FC<SezioneImpresaProps> = ({}) => {
  const [objectToCreate, setObjectToCreate] = useState<string | undefined>(
    undefined
  );
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector);
  const navigate = useNavigate();
  const [breadcrumbsItems, setBreadcrumbsItems] = useState<
    (string | Impresa)[]
  >(["Home", impresaSelezionata as Impresa]);

  return (
    <>
      <Breadcrumb
        breadcrumbsItems={breadcrumbsItems}
        setBreadcrumbsItems={setBreadcrumbsItems}
        setObjectToCreate={setObjectToCreate}
      />
      {!objectToCreate ? (
        <div className="text-center">
          <div className="grid sm:grid-cols-3 grid-cols-1 place-items-center gap-4 pt-6 text-white lg:text-3xl text-2xl">
            <div
              className="bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80 "
              style={{
                backgroundColor: "#FFC650",
                backgroundImage:
                  ' url("../img/loghi_cruscotto/Anagrafica.png") ',
              }}
              onClick={() => {
                setObjectToCreate("Impresa");
                setBreadcrumbsItems([...breadcrumbsItems, "Anagrafica"]);
                navigate("anagrafica");
              }}
            >
              <span>Anagrafica e Doc.</span>
            </div>
            <div
              className="bg-contain md:bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center  rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: "#FFC650",
                backgroundImage:
                  ' url("../img/loghi_cruscotto/Maestranze.png") ',
              }}
              onClick={() => {
                setObjectToCreate("Maestranza");
                setBreadcrumbsItems([...breadcrumbsItems, "Maestranze"]);
                navigate("maestranze");
              }}
            >
              <span>Maestranze</span>
            </div>
            <div
              className="bg-contain md:bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: "#FFC650",
                backgroundImage:
                  ' url("../img/loghi_cruscotto/Macchine.png") ',
              }}
              onClick={() => {
                setObjectToCreate("Macchina");
                setBreadcrumbsItems([
                  ...breadcrumbsItems,
                  "Macchine e Attrezzature",
                ]);
                navigate("macchineEAttrezzature");
              }}
            >
              <span>Macchine e Attrezzature</span>
            </div>
            <div
              className="sm:col-span-3 col-span-1 bg-contain md:bg-auto py-12 bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
              onClick={() => {
                setObjectToCreate("Cantieri");
                setBreadcrumbsItems([
                  ...breadcrumbsItems,
                  "Cantieri",
                ]);
                navigate("cantieri");
              }}
              
              style={{
                backgroundColor: "#FFC650",
                backgroundImage:
                  ' url("../img/loghi_cruscotto/Cantieri.png") ',
              }}
            >
              Cantieri
            </div>
            <div
              className=" bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: "#FFC650",
                backgroundImage:
                  ' url("../img/loghi_cruscotto/Gru.png") ',
              }}
              onClick={() => {
                setObjectToCreate("Gru");
                setBreadcrumbsItems([...breadcrumbsItems, "Gru"]);
                navigate("gru");
              }}
            >
              <span>Gru</span>
            </div>
            <div
              className="bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center  rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: "#FFC650",
                backgroundImage:' url("../img/loghi_cruscotto/Ponteggio.png") ',
              }}
              onClick={() => {
                setObjectToCreate("Ponteggio");
                setBreadcrumbsItems([...breadcrumbsItems, "Ponteggi"]);
                navigate("ponteggi");
              }}
            >
              <span>Ponteggi</span>
            </div>
            <div
              className="bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: "#FFC650",
                backgroundImage: ' url("../img/loghi_cruscotto/Estintori.png") ',
              }}
              onClick={() => {
                setObjectToCreate("Estintore");
                setBreadcrumbsItems([...breadcrumbsItems, "Estintori"]);
                navigate(`estintori`);
              }}
            >
              <span>Estintori</span>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default SezioneImpresa;
