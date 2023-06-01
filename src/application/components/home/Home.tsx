import React, { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useFaunaQuery } from "../../../faunadb/hooks/useFaunaQuery";
import { useDispatch, useSelector } from "react-redux";
import { clearOrganizationStorages } from "../../../utils/auth0/auth0";
import { getAllImpreseByCreataDa } from "../../../faunadb/api/impresaAPIs";
import {Impresa, impresaTemporanea} from "../../../model/Impresa";
import {
  addImpresa,
  ImpreseSelector, resetBreadcrumbItems, setImpresaDaCreare,
  setImpresaSelezionata, setObjectToCreate,
} from "../../../store/impresaSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { CreazioneImpresa } from "../factory/creazioneImpresa/CreazioneImpresa";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { logout, user } = useAuth0();
  const { execQuery } = useFaunaQuery();

  const imprese = useSelector(ImpreseSelector);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBreadcrumbItems())
    dispatch(setObjectToCreate(undefined))
    dispatch(setImpresaDaCreare(impresaTemporanea))
    if (imprese.length === 0) {
      execQuery(getAllImpreseByCreataDa, user?.email).then((res) => {
        console.log(res)
        res.forEach((r: { id: string; impresa: Impresa }) => {
          dispatch(
              addImpresa({
                ...r.impresa,
                faunaDocumentId: r.id,
              } as Impresa)
          );
        });
      });
    }
  }, []);


  return (
      <>
        {imprese.length === 0 ? (
            <>
              <CreazioneImpresa primoAccesso={true}/>
            </>
        ) : (
            <>
              <div className="flex flex-row items-stretch justify-center w-full">
                <div className="flex flex-col lg:flex-row mt-8 mb-8 gap-8 items-center ">
                  <div
                      className="bg-amber-300 shadow-md p-5 rounded-3xl min-h-[150px] h-full w-full lg:w-4/12 flex justify-center flex-col items-center hover:cursor-pointer hover:underline text-white"
                      onClick={() => {
                        dispatch(
                            setImpresaSelezionata(
                                imprese.filter((i) => i.tipo === "Affidataria")[0]
                            )
                        );
                        navigate(
                            `/impresa/${
                                imprese.filter((i) => i.tipo === "Affidataria")[0]
                                    .faunaDocumentId
                            }`
                        );
                      }}
                  >
                <span className="font-semibold text-3xl uppercase text-center">
                  {
                    imprese.filter((i) => i.tipo === "Affidataria")[0]
                        .anagrafica.attr.filter(a => a.label === 'denominazione')[0].value
                  }
                </span>
                  </div>

                  <div className="w-full gap-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {imprese
                        .filter((i) => i.tipo === "Subappaltatrice")
                        .map((is) => {
                          return (
                              <div
                                  key={(is as Impresa).faunaDocumentId}
                                  className="bg-gray-300 shadow-md rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60 p-4"
                                  onClick={() => {
                                    dispatch(setImpresaSelezionata(is));
                                    navigate(`impresa/${is.faunaDocumentId}`);
                                  }}
                              >
                        <span className="text-white font-semibold text-xl uppercase text-center">
                          {(is as Impresa).anagrafica &&
                              (is as Impresa).anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}
                        </span>
                                <span className="text-white font-semibold text-sm uppercase text-center mt-5">
                          Impresa Subappaltatrice
                        </span>
                              </div>
                          );
                        })}

                    <div
                        className="bg-gray-300 shadow-md rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60"
                        onClick={() => {
                          dispatch(setObjectToCreate("Impresa"));
                          navigate("/creazione/impresa");
                        }}
                    >
                      <AiOutlinePlus size="50px" className="text-white" />
                      <span className="text-white font-semibold text-center mt-3">
                    Aggiungi impresa sub
                  </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-8 text-white font-semibold text-2xl">
                <div className=" flex w-6/12 sm:w-7/12 md:w-8/12 p-4 bg-gray-300 shadow-md rounded-3xl min-h-[180px] justify-center items-center hover:cursor-pointer hover:opacity-60"
                     onClick={() => navigate('totalControl')}
                >
                  Total Control
                </div>
                <div className=" flex w-6/12 sm:w-5/12 md:w-4/12 p-4 bg-gray-300 shadow-md rounded-3xl min-h-[180px] justify-center items-center hover:cursor-pointer hover:opacity-60"
                     onClick={() => navigate('assistenza')}>
                  Assistenza
                </div>
              </div>
              <div className="flex flex-row justify-center w-full mt-5 font-light hover:font-semibold text-center text-2xl">
                <button
                    onClick={() => {
                      clearOrganizationStorages();
                      logout({ returnTo: "http://localhost:3000/" });
                    }}
                >
                  🚪Log Out🚪
                </button>
              </div>
            </>
        )}
      </>
  );
};

export default withAuthenticationRequired(Home);

