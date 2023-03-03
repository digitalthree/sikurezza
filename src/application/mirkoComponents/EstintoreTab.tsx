import React from "react";
import EditButton from "../../shared/tableComponents/EditButton";

export interface EstintoreTabProps {}

const EstintoreTab: React.FC<EstintoreTabProps> = ({}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-100">
        <div className="flex flex-row w-6/12 sm:w-5/12 md:w-3/12 justify-center">
          <img
            src="\img\loghi_schede\logo_estintori.png"
            className="pt-2"
            alt="estintori logo"
          ></img>
        </div>
        <div className="flex-col text-3xl py-5 text-zinc-400 font-semibold underline">
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
            <option>Città</option>
          </select>
        </div>
        <div className="overflow-x-auto w-full mt-3">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Città</th>
                <th>Opzioni</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>1</th>
                <td>Condominio Panorama</td>
                <td>Teramo</td>
                <td>
                  <EditButton />
                </td>
              </tr>
              {/* row 2 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>2</th>
                <td>Condominio Albani</td>
                <td>Giulianova</td>
                <td>
                  <EditButton />
                </td>
              </tr>
              {/* row 3 */}
              <tr className="link link-hover hover:text-sky-500">
                <th>3</th>
                <td>Condominio Virgilio</td>
                <td>Teramo</td>
                <td>
                  <EditButton />
                </td>
              </tr>
              <tr className="link link-hover hover:text-sky-500">
                <th>4</th>
                <td>Condominio Giordani</td>
                <td>Teramo</td>
                <td>
                  <EditButton />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button className="mt-8 btn btn-circle px-6 border-0 hover:bg-zinc-500 w-full text-white bg-zinc-300">
            <span className="mr-2">+</span>Aggiungi Estintore
          </button>
        </div>
      </div>
    </>
  );
};

export default EstintoreTab;
