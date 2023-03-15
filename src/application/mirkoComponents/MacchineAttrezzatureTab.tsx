import React, {useEffect, useState} from "react";
import EditButtonEstintore from "../../shared/tableComponents/EditButtonEstintore";
import {useDispatch, useSelector} from "react-redux";
import {
  addPonteggio,
  PonteggioSelector,
  resetPonteggio,
  setPonteggioDaCreare,
  setPonteggioSelezionato
} from "../../store/ponteggioSlice";
import {useFaunaQuery} from "../../faunadb/hooks/useFaunaQuery";
import {ImpresaSelezionataSelector} from "../../store/impresaSlice";
import {getAllPonteggiByCreatoDa} from "../../faunadb/api/ponteggioAPIs";
import {Ponteggio, ponteggioDefault} from "../../model/Ponteggio";
import {
  addMacchinaEAttrezzatura,
  MacchinaEAttrezzaturaSelector,
  resetMacchinaEAttrezzatura, setMacchinaEAttrezzaturaDaCreare, setMacchinaEAttrezzaturaSelezionato
} from "../../store/macchinaEAttrezzaturaSlice";
import {getAllMacchineEAttrezzatureByCreatoDa} from "../../faunadb/api/macchinaEAttrezzaturaAPIs";
import {MacchinaEAttrezzatura, macchinaEAttrezzaturaDefault} from "../../model/MacchineEAttrezzature";
import EditButtonMacchinaEAttrezzatura from "../../shared/tableComponents/EditButtonMacchinaEAttrezzatura";
import CreazioneMacchinaEAttrezzatura from "./modal/CreazioneMacchinaEAttrezzatura";

export interface MacchineAttrezzatureTabProps {}

const MacchineAttrezzatureTab: React.FC<MacchineAttrezzatureTabProps> = ({}) => {

  const macchineEAttrezzature = useSelector(MacchinaEAttrezzaturaSelector)
  const {execQuery} = useFaunaQuery()
  const dispatch = useDispatch()
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
  const [editabile, setEditabile] = useState<boolean>(true)
  const [modifica, setModifica] = useState<boolean>(false)


  useEffect(() => {
    dispatch(resetMacchinaEAttrezzatura())

    execQuery(getAllMacchineEAttrezzatureByCreatoDa, impresaSelezionata?.faunaDocumentId).then((res) => {
      res.forEach((m: { id: string; macchinaEAttrezzatura: MacchinaEAttrezzatura }) => {
        dispatch(
            addMacchinaEAttrezzatura({
              ...m.macchinaEAttrezzatura,
              faunaDocumentId: m.id,
            } as MacchinaEAttrezzatura)
        );
      });
    });

  }, [impresaSelezionata])

  return (
      <>
        <div className="flex flex-col justify-center items-center w-100">
          <div className="flex flex-row justify-center w-10/12 sm:w-8/12 md:w-6/12 xl:w-5/12">
            <img
                src="\img\loghi_schede\logo_macchine_attrezzature.png"
                className="pt-2 w-full"
                alt="estintori logo"
            ></img>
          </div>
          <div className="flex-col text-xl sm:text-2xl md:text-3xl text-center py-5 text-zinc-400 font-semibold underline">
            MENU' MACCHINE E ATTREZZATURE
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
              <option>Targa</option>
            </select>
          </div>
          <div className="overflow-x-auto overflow-y-hidden w-full mt-3 border-t-zinc-300 border rounded-xl">
            <table className="table table-zebra w-full ">
              <tbody>
              {macchineEAttrezzature.map((m, index) => {
                return(
                    <tr className="link link-hover hover:text-sky-500">
                      <th>{index+1}</th>
                      <td>{m.attr.filter(ma => ma.nome === 'denominazione')[0].value}</td>
                      <td>{m.attr.filter(ma => ma.nome === 'targa')[0].value}</td>
                      <td>
                        <EditButtonMacchinaEAttrezzatura macchinaEAttrezzaturaTarget={m} setEditabile={setEditabile} setModifica={setModifica}/>
                      </td>
                    </tr>
                )
              })}
              </tbody>
            </table>
          </div>
          <div>
            <label htmlFor="my-modal-7"
                   className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300"
                   onClick={() => {
                     dispatch(setMacchinaEAttrezzaturaSelezionato(undefined))
                     dispatch(setMacchinaEAttrezzaturaDaCreare(macchinaEAttrezzaturaDefault))
                     setModifica(false)
                     setEditabile(true)
                   }}
            >
              <span className="mr-2">+</span>Aggiungi Macchina o Attrezzatura
            </label>
          </div>
        </div>
        <CreazioneMacchinaEAttrezzatura editabile={editabile} modifica={modifica} setModifica={setModifica}/>
      </>
  );
};

export default MacchineAttrezzatureTab;

