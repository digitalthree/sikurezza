import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../store/impresaSlice";
import {
  addPonteggio,
  PonteggioSelector,
  resetPonteggio,
  setPonteggioDaCreare,
  setPonteggioSelezionato
} from "../../store/ponteggioSlice";
import {Ponteggio, ponteggioDefault} from "../../model/Ponteggio";
import EditButtonPonteggio from "../../shared/tableComponents/EditButtonPonteggio";
import CreazionePonteggio from "./modal/CreazionePonteggio";
import { useDynamoDBQuery } from "../../dynamodb/hook/useDynamoDBQuery";
import { getAllPonteggiByCreatoDa } from "../../dynamodb/api/ponteggioAPIs";
import { convertFromDynamoDBFormat } from "../../dynamodb/utils/conversionFunctions";

export interface PonteggioTabProps {}

const PonteggioTab: React.FC<PonteggioTabProps> = ({}) => {

  const ponteggi = useSelector(PonteggioSelector)
  const {execQuery2} = useDynamoDBQuery()
  const dispatch = useDispatch()
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
  const [editabile, setEditabile] = useState<boolean>(true)
  const [modifica, setModifica] = useState<boolean>(false)


  useEffect(() => {
    dispatch(resetPonteggio())

    execQuery2(getAllPonteggiByCreatoDa, impresaSelezionata?.id).then((res) => {
      res.Items.forEach((item:any) => {
        let p = convertFromDynamoDBFormat(item) as Ponteggio;
        dispatch(
            addPonteggio(p)
        );
      });
    });

  }, [impresaSelezionata])

  return (
    <>
      <div className="flex flex-col justify-center items-center w-100">
        <div className="flex flex-row justify-center w-10/12 sm:w-8/12 md:w-6/12 xl:w-5/12">
          <img
            src="\img\loghi_schede\logo_ponteggio.png"
            className="pt-2 w-full"
            alt="maestranze logo"
          ></img>
        </div>
        <div className="flex-col text-xl sm:text-2xl md:text-3xl text-center py-5 text-zinc-400 font-semibold underline">
          MENU' PONTEGGI
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
            <option>Città</option>
          </select>
        </div>
        <div className="overflow-x-auto overflow-y-hidden w-full mt-3 border-t-zinc-300 border rounded-xl">
          <table className="table table-zebra w-full  ">
            <tbody>
              {/* row 1 */}
              {ponteggi.map((p, index) => {
                return(
                    <tr className="link link-hover hover:text-sky-500">
                      <th>{index+1}</th>
                      <td>{p.attr.filter(po => po.nome === 'marca')[0].value}</td>
                      <td>{p.attr.filter(po => po.nome === 'tipologia')[0].value}</td>
                      <td>
                        <EditButtonPonteggio ponteggioTarget={p} setEditabile={setEditabile} setModifica={setModifica} />
                      </td>
                    </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div>
          <label htmlFor="my-modal-6"
                 className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300"
                 onClick={() => {
                   dispatch(setPonteggioSelezionato(undefined))
                   dispatch(setPonteggioDaCreare(ponteggioDefault))
                   setModifica(false)
                   setEditabile(true)
                 }}
          >
            <span className="mr-2">+</span>Aggiungi Ponteggio
          </label>
        </div>
      </div>
      <CreazionePonteggio editabile={editabile} modifica={modifica} setModifica={setModifica}/>
    </>
  );
};

export default PonteggioTab;
