import React from "react";
import EditButton from "../../shared/tableComponents/EditButton";

export interface MacchineAttrezzatureTabProps {}

const MacchineAttrezzatureTab: React.FC<
    MacchineAttrezzatureTabProps
    > = ({}) => {
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
              {/* head */}
              {/* <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Targa</th>
              </tr>
            </thead> */}
              <tbody>
              {/* row 1 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>1</th>
                <td>Camion 1</td>
                <td>EH6756</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              {/* row 2 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>2</th>
                <td>Bobcat</td>
                <td>IT7867</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              {/* row 3 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>3</th>
                <td>Minipala</td>
                <td>GF6567</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              <tr className="link link-hover hover:text-sky-500">
                <th>4</th>
                <td>Bobcat 2</td>
                <td>FR1895</td>
                <td>
                  <EditButton setEditabile={() => {}} setModifica={() => {}}/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div>
            <button className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300">
              <span className="mr-2">+</span>Aggiungi Macchina
            </button>
          </div>
        </div>
      </>
  );
};

export default MacchineAttrezzatureTab;

