import React, {useEffect, useRef} from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrganizationStorages } from "../../../utils/auth0/auth0";
import {Impresa} from "../../../model/Impresa";
import {
    addImpresa, addImpresaSubId,
    ImpreseSelector, removeImpresa, resetBreadcrumbItems,
    setImpresaSelezionata, setObjectToCreate,
} from "../../../store/impresaSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { CreazioneImpresa } from "../factory/creazioneImpresa/CreazioneImpresa";
import { useNavigate } from "react-router-dom";
import {TfiImport} from "react-icons/tfi";
import {MacchinaEAttrezzatura} from "../../../model/MacchineEAttrezzature";
import {addMacchinaEAttrezzatura} from "../../../store/macchinaEAttrezzaturaSlice";
import {BsTrash} from "react-icons/bs";
import {deleteFileS3} from "../../../aws/s3APIs";
import { useDynamoDBQuery } from "../../../dynamodb/hook/useDynamoDBQuery";
import { deleteImpresaFromDynamo, getAllImpreseByCreataDa, getImpresaById, updateImpresaInDynamo } from "../../../dynamodb/api/impresaAPIs";
import { convertFromDynamoDBFormat } from "../../../dynamodb/utils/conversionFunctions";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { logout, user } = useAuth0();
  const { execQuery2 } = useDynamoDBQuery();

  const imprese = useSelector(ImpreseSelector);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBreadcrumbItems())
    dispatch(setObjectToCreate(undefined))
    if (imprese.length === 0) {
      execQuery2(getAllImpreseByCreataDa, user?.email).then((res) => {
        res.Items.forEach((item: any) => {
          let impresaItem = convertFromDynamoDBFormat(item) as Impresa;
          dispatch(
              addImpresa(impresaItem)
          );
          if(impresaItem.tipo === "Affidataria"){
            impresaItem.impreseSubappaltatrici.forEach(is => {
              execQuery2(getImpresaById, is).then(res => {
                let impresa = convertFromDynamoDBFormat(res.Item) as Impresa;
                dispatch(addImpresa(impresa))
              })
            })
          }
        })
      })
    }
  }, []);

  const importRef = useRef(null)

  const onImportPhysicsClick = () => {
    let input = importRef.current;
    if (input) {
      (input as HTMLInputElement).click();
    }
  };

  return (
      <>
        {imprese.length === 0 ? (
            <>
              <CreazioneImpresa primoAccesso={true}/>
            </>
        ) : (
            <>
              <div className="flex flex-row w-full">
                <div className="flex flex-col lg:flex-row mt-8 mb-8 gap-8 items-center w-full">
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
                                    .id
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
                    {imprese.filter((i) => i.tipo === "Subappaltatrice").length > 0 &&
                      imprese.filter((i) => i.tipo === "Subappaltatrice").map((is) => {
                          return (
                              <div className="relative">
                                <div
                                    key={(is as Impresa).id}
                                    className="bg-gray-300 shadow-md rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60 p-4"
                                    onClick={() => {
                                      dispatch(setImpresaSelezionata(is));
                                      navigate(`impresa/${is.id}`);
                                    }}
                                >
                                    <span className="text-white font-semibold text-xl uppercase text-center">
                                        {(is as Impresa).anagrafica && (is as Impresa).anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}
                                    </span>
                                    <span className="text-white font-semibold text-sm uppercase text-center mt-5">
                                        Impresa Subappaltatrice
                                    </span>
                                </div>
                                <div className="absolute top-[-5px] border border-gray-300 right-[-5px] p-1 rounded-full bg-gray-100 hover:cursor-pointer hover:opacity-70"
                                     onClick={() => {
                                         let confirm = window.confirm(`Sei sicuro di voler eliminare l'impresa ${(is as Impresa).anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}`)
                                         if(confirm){
                                             if(imprese.filter(i => i.tipo === "Affidataria")[0].impreseSubappaltatrici.filter(imp => imp === is.id).length > 0){
                                                 console.log(imprese.filter(i => i.tipo === "Affidataria")[0].impreseSubappaltatrici.filter(imp => imp !== is.id))
                                                 execQuery2(updateImpresaInDynamo,
                                                     {...imprese.filter(i => i.tipo === "Affidataria")[0],
                                                         impreseSubappaltatrici: imprese.filter(i => i.tipo === "Affidataria")[0].impreseSubappaltatrici.filter(imp => imp !== is.id)} as Impresa)
                                                     .then((() => {})
                                                 )
                                             }else{
                                                 execQuery2(deleteImpresaFromDynamo, is.id).then((() => {}))
                                                 is.documentiIdoneitaImpresa.forEach(d => {
                                                     if(typeof d.file.value === 'string'){
                                                         deleteFileS3(d.file.value).then(() => {})
                                                     }
                                                 })
                                             }
                                             dispatch(removeImpresa(is))
                                         }
                                     }}
                                >
                                    <BsTrash color="gray"/>
                                </div>
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
                    <div
                        className="bg-gray-300 shadow-md rounded-3xl min-h-[180px] flex justify-center flex-col items-center hover:cursor-pointer hover:opacity-60"
                        onClick={onImportPhysicsClick}
                    >
                      <TfiImport size="50px" className="text-white" />
                      <span className="text-white font-semibold text-center mt-3">
                          Importa impresa sub
                      </span>
                      <input
                          type="file"
                          ref={importRef}
                          style={{display: "none"}}
                          accept="application/json"
                          onChange={(e) => {
                            let files = e.target.files;
                            files &&
                            files[0].text().then((value) => {
                              let impresaDaImportare: {
                                impresa: Impresa;
                                macchineEAttrezzature: MacchinaEAttrezzatura[]
                              } = JSON.parse(value);
                              execQuery2(updateImpresaInDynamo, {
                                ...imprese.filter((i) => i.tipo === "Affidataria")[0],
                                impreseSubappaltatrici: [...imprese.filter((i) => i.tipo === "Affidataria")[0]?.impreseSubappaltatrici as string[], impresaDaImportare.impresa.id]
                              }).then((res) => {
                                  console.log(res)
                                dispatch(addImpresaSubId(impresaDaImportare.impresa.id as string))
                                dispatch(addImpresa(impresaDaImportare.impresa))
                                impresaDaImportare.macchineEAttrezzature.forEach(m => {
                                  dispatch(addMacchinaEAttrezzatura(m))
                                })
                                e.target.files = null
                              })

                            });
                          }}
                      />
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
                      logout({ returnTo: process.env.REACT_APP_BASE_URL });
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

