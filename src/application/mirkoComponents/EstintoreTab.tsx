import React, { useEffect, useState } from "react";
import EditButtonEstintore from "../../shared/tableComponents/EditButtonEstintore";
import { useDispatch, useSelector } from "react-redux";
import {
  addEstintore,
  EstintoriSelector,
  resetEstintori,
  setEstintoreSelezionato,
} from "../../store/estintoreSlice";
import CreazioneEstintore from "./modal/CreazioneEstintore";
import { Estintore, estintoreDefault } from "../../model/Estintore";
import { ImpresaSelezionataSelector } from "../../store/impresaSlice";
import { useDynamoDBQuery } from "../../dynamodb/hook/useDynamoDBQuery";
import { getAllEstintoreByCreatoDa } from "../../dynamodb/api/estintoreAPIs";
import { convertFromDynamoDBFormat } from "../../dynamodb/utils/conversionFunctions";

export interface EstintoreTabProps {}

const EstintoreTab: React.FC<EstintoreTabProps> = ({}) => {
  const estintori = useSelector(EstintoriSelector);
  const [estintoreDaCreare, setEstintoreDaCreare] =
    useState<Estintore>(estintoreDefault);
  const [editabile, setEditabile] = useState<boolean>(true);
  const [modifica, setModifica] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { execQuery2 } = useDynamoDBQuery();
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector);

  useEffect(() => {
    dispatch(resetEstintori());

    execQuery2(getAllEstintoreByCreatoDa, impresaSelezionata?.id).then(
      (res) => {
        res.Items.forEach((item: any) => {
          let estintore = convertFromDynamoDBFormat(item) as Estintore;
          dispatch(addEstintore(estintore));
        });
      }
    );
  }, [impresaSelezionata]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-100">
        <div className="flex flex-row justify-center w-10/12 sm:w-7/12 md:w-5/12 xl:w-4/12">
          <img
            src="\img\loghi_schede\logo_estintori.png"
            className="pt-2 w-full"
            alt="estintori logo"
          ></img>
        </div>
        <div className="flex-col text-2xl sm:text-3xl py-5 text-zinc-400 font-semibold underline">
          MENU' ESTINTORI
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
            <option>Nome</option>
            <option>Cantiere</option>
          </select>
        </div>
        <div className="overflow-x-auto overflow-y-hidden w-full mt-3 border-t-zinc-300 border rounded-xl">
          <table className="table table-zebra w-full ">
            <tbody>
              {/* row 1 */}
              {estintori.map((e, index) => {
                return (
                  <tr key={e.id} className="link link-hover hover:text-sky-500">
                    <th>{index + 1}</th>
                    <td>{e.nome}</td>
                    <td>{e.cantiere}</td>
                    <td>
                      <EditButtonEstintore
                        estintoreTarget={e}
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
            htmlFor="my-modal-4"
            className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300"
            onClick={() => {
              dispatch(setEstintoreSelezionato(undefined));
              setModifica(false);
              setEditabile(true);
            }}
          >
            <span className="mr-2">+</span>Aggiungi Estintore
          </label>
        </div>
      </div>
      <CreazioneEstintore
        estintoreDaCreare={estintoreDaCreare}
        setEstintoreDaCreare={setEstintoreDaCreare}
        editabile={editabile}
        modifica={modifica}
        setModifica={setModifica}
      />
    </>
  );
};

export default EstintoreTab;
