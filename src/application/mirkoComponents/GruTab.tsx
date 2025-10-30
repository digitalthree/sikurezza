import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImpresaSelezionataSelector } from "../../store/impresaSlice";
import {
  addGru,
  GruSelector,
  resetGru,
  setGruDaCreare,
  setGruSelezionata,
} from "../../store/gruSlice";
import { Gru, gruDefault } from "../../model/Gru";
import CreazioneGru from "./modal/CreazioneGru";
import EditButtonGru from "../../shared/tableComponents/EditButtonGru";
import { useDynamoDBQuery } from "../../dynamodb/hook/useDynamoDBQuery";
import { getAllGruByCreatoDa } from "../../dynamodb/api/gruAPIs";
import { convertFromDynamoDBFormat } from "../../dynamodb/utils/conversionFunctions";
export interface GruTabProps {}

const GruTab: React.FC<GruTabProps> = ({}) => {
  const grus = useSelector(GruSelector);
  const { execQuery2 } = useDynamoDBQuery();
  const dispatch = useDispatch();
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector);
  const [editabile, setEditabile] = useState<boolean>(true);
  const [modifica, setModifica] = useState<boolean>(false);

  useEffect(() => {
    dispatch(resetGru());

    execQuery2(getAllGruByCreatoDa, impresaSelezionata?.id).then((res) => {
      res.Items.forEach((item: any) => {
        let gru = convertFromDynamoDBFormat(item) as Gru;
        dispatch(addGru(gru));
      });
    });
  }, [impresaSelezionata]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-100">
        <div className="flex flex-row justify-center w-10/12 sm:w-8/12 md:w-6/12 xl:w-5/12">
          <img
            src="\img\loghi_schede\logo_gru.png"
            className="pt-2 w-full"
            alt="estintori logo"
          ></img>
        </div>
        <div className="flex-col text-xl sm:text-2xl md:text-3xl text-center py-5 text-zinc-400 font-semibold underline">
          MENU' GRU E MEZZI DI SOLLEVAMENTO
        </div>
        <div className="flex flex-row w-full justify-center items-center mt-2 mb-5">
          <input
            type="text"
            placeholder="Cerca"
            className="w-3/5 sm:w-2/5 px-5 input input-sm rounded-full border border-zinc-400 focus:border-0 "
          />
          <select className=" w-2/5 sm:w-1/5 select select-sm ml-5 px-5 rounded-full border border-zinc-400 focus:border-0 ">
            <option disabled selected>
              Ordina per
            </option>
            <option>Tipologia</option>
            <option>Cantiere</option>
            <option>Città</option>
          </select>
        </div>
        <div className="overflow-x-auto overflow-y-hidden w-full mt-3 border-t-zinc-300 border rounded-xl">
          <table className="table table-zebra w-full ">
            <tbody>
              {/* row 1 */}
              {grus.map((g, index) => {
                return (
                  <tr className="link link-hover hover:text-sky-500">
                    <th>{index + 1}</th>
                    <td>
                      {g.attr.filter((gr) => gr.nome === "marca")[0].value}
                    </td>
                    <td>
                      {g.attr.filter((gr) => gr.nome === "modello")[0].value}
                    </td>
                    <td>
                      {g.attr.filter((gr) => gr.nome === "cantiere")[0].value}
                    </td>
                    <td>
                      <EditButtonGru
                        gruTarget={g}
                        setEditabile={setEditabile}
                        setModifica={setModifica}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <label
            htmlFor="my-modal-5"
            className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300"
            onClick={() => {
              dispatch(setGruSelezionata(undefined));
              dispatch(setGruDaCreare(gruDefault));
              setModifica(false);
              setEditabile(true);
            }}
          >
            <span className="mr-2">+</span>Aggiungi Gru
          </label>
        </div>
      </div>
      <CreazioneGru
        editabile={editabile}
        modifica={modifica}
        setModifica={setModifica}
      />
    </>
  );
};

export default GruTab;
