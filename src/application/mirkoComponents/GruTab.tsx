import React from "react";
import EditButton from "../../shared/tableComponents/EditButton";
export interface GruTabProps {}

const GruTab: React.FC<GruTabProps> = ({}) => {
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
              {/* head */}
              {/* <thead>
              <tr>
                <th></th>
                <th>Tipologia</th>
                <th>Cantiere</th>
                <th>Città</th>
                <th>Opzioni</th>
              </tr>
            </thead> */}
              <tbody>
              {/* row 1 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>1</th>
                <td>Gru a torre</td>
                <td>Condominio Panorama</td>
                <td>Teramo</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              {/* row 2 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>2</th>
                <td>Ascensore di ponteggio</td>
                <td>Condominio Albani</td>
                <td>Giulianova</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              {/* row 3 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>3</th>
                <td>Gru su autocarro</td>
                <td>Condominio Virgilio</td>
                <td>Teramo</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              <tr className="link link-hover hover:text-sky-500">
                <th>4</th>
                <td>Merlo</td>
                <td>Condominio Giordani</td>
                <td>Teramo</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              {/* row 4 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>5</th>
                <td>Carrello elevatore</td>
                <td>Condominio Panorama</td>
                <td>Teramo</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div>
            <button className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300">
              <span className="mr-2">+</span>Aggiungi Mezzo di Sollevamento
            </button>
          </div>
        </div>
      </>
  );
};

export default GruTab;

