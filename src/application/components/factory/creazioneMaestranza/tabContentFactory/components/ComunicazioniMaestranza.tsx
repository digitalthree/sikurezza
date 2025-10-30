import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaestranzaToMaestranzaSlice,
  MaestranzaDaCreareSelector,
  MaestranzaSelezionataSelector,
  removeMaestranzaToMaestranzaSlice,
  setComunicazioniInMaestranza,
  setFileInCorsiMaestranza,
  setFileInDocumentiMaestranza,
  setMaestranzaDaCreare,
} from "../../../../../../store/maestranzaSlice";
import { useForm } from "react-hook-form";
import { TfiSave } from "react-icons/tfi";
import { uploadFileS3 } from "../../../../../../aws/s3APIs";
import { maestranzaDefault } from "../../../../../../model/Maestranza";
import {
  addMaestranza,
  ImpresaSelezionataSelector,
  setObjectToCreate,
} from "../../../../../../store/impresaSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDynamoDBQuery } from "../../../../../../dynamodb/hook/useDynamoDBQuery";
import {
  createMaestranzaInDynamo,
  updateMaestranzaInDynamo,
} from "../../../../../../dynamodb/api/maestranzaAPIs";
import { updateImpresaInDynamo } from "../../../../../../dynamodb/api/impresaAPIs";

export interface ComunicazioniMaestranzaProps {
  editabile: boolean;
  modifica: boolean;
}

const ComunicazioniMaestranza: React.FC<ComunicazioniMaestranzaProps> = ({
  editabile,
  modifica,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector);
  const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector);
  const [maestranza, setMaestranza] = useState(maestranzaDaCreare);
  useEffect(() => {
    if (maestranzaSelezionata) {
      setMaestranza(maestranzaSelezionata);
    } else {
      setMaestranza(maestranzaDaCreare);
    }
  }, [maestranzaDaCreare]);
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector);
  const [spinner, setSpinner] = useState(false);
  const [uploadToDynamo, setUploadToDynamo] = useState(false);
  const [save, setSave] = useState(false);

  const { execQuery2 } = useDynamoDBQuery();

  const { handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    maestranza.documenti.forEach((e) => {
      if (e.file && typeof e.file !== "string") {
        uploadFileS3(e.file as File).then((res) => {
          if (res) {
            dispatch(
              setFileInDocumentiMaestranza({ nome: e.nome, file: res.key })
            );
          }
        });
      }
    });
    maestranza.corsi.forEach((e) => {
      if (e.file && typeof e.file !== "string") {
        uploadFileS3(e.file as File).then((res) => {
          if (res) {
            dispatch(setFileInCorsiMaestranza({ nome: e.nome, file: res.key }));
          }
        });
      }
    });
    setSave(true);
  };

  useEffect(() => {
    if (
      maestranza.documenti.filter((d) => !d.file || typeof d.file === "string")
        .length === Object.entries(maestranza.documenti).length &&
      maestranza.corsi.filter((d) => !d.file || typeof d.file === "string")
        .length === Object.entries(maestranza.corsi).length
    ) {
      setUploadToDynamo(true);
    }
  }, [maestranza]);

  useEffect(() => {
    if (uploadToDynamo && save && !modifica) {
      setSpinner(true);
      let id = crypto.randomUUID();
      execQuery2(createMaestranzaInDynamo, {
        ...maestranza,
        creatoDa: impresaSelezionata?.id as string,
        id: id
      }).then((res) => {
        dispatch(
          addMaestranza({
            impresa: impresaSelezionata?.id as string,
            maestranza: id,
          })
        );
        execQuery2(updateImpresaInDynamo, {
          ...impresaSelezionata,
          maestranze: [
            ...(impresaSelezionata?.maestranze as string[]),
            id,
          ],
        });
        dispatch(setMaestranzaDaCreare(maestranzaDefault));
        setSpinner(false);
        dispatch(setObjectToCreate(undefined));
        navigate(`/impresa/${impresaSelezionata?.id}/maestranze`);
      });
    }
    if (uploadToDynamo && save && modifica) {
      setSpinner(true);
      execQuery2(updateMaestranzaInDynamo, {
        ...maestranza,
        creatoDa: impresaSelezionata?.id as string,
        id: maestranzaSelezionata?.id,
      }).then((res) => {
        dispatch(
          removeMaestranzaToMaestranzaSlice(maestranzaSelezionata?.id as string)
        );
        dispatch(
          addMaestranzaToMaestranzaSlice({
            ...maestranza,
            id: maestranzaSelezionata?.id,
            creatoDa: impresaSelezionata?.id as string,
          })
        );
        dispatch(setMaestranzaDaCreare(maestranzaDefault));
        setSpinner(false);
        dispatch(setObjectToCreate(undefined));
        navigate(`/impresa/${impresaSelezionata?.id}/maestranze`);
      });
    }
  }, [uploadToDynamo, save]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-[40%] p-10 shadow-2xl ${spinner && "opacity-20"}`}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold">Telefono: </span>
          <div className="flex flex-col">
            <input
              placeholder="Telefono"
              className="rounded border border-gray-400 shadow p-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              disabled={!editabile}
              onChange={(e) =>
                dispatch(
                  setComunicazioniInMaestranza({
                    nome: "telefono",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={maestranza.comunicazioni.telefono}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">Cellulare privato: </span>
          <div className="flex flex-col">
            <input
              placeholder="Cellulare privato"
              className="rounded border border-gray-400 shadow p-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              disabled={!editabile}
              onChange={(e) =>
                dispatch(
                  setComunicazioniInMaestranza({
                    nome: "cellularePrivato",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={maestranza.comunicazioni.cellularePrivato}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">Cellulare aziendale: </span>
          <div className="flex flex-col">
            <input
              placeholder="Cellulare aziendale"
              className="rounded border border-gray-400 shadow p-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              disabled={!editabile}
              onChange={(e) =>
                dispatch(
                  setComunicazioniInMaestranza({
                    nome: "cellulareAziendale",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={maestranza.comunicazioni.cellulareAziendale}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">Indirizzo mail*: </span>
          <div className="flex flex-col">
            <input
              placeholder="Indirizzo mail"
              className="rounded border border-gray-400 shadow p-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              disabled={!editabile}
              onChange={(e) =>
                dispatch(
                  setComunicazioniInMaestranza({
                    nome: "email",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={maestranza.comunicazioni.email}
            />
          </div>
        </div>
        {editabile && (
          <div className="flex mt-10">
            <div className="rounded-bl rounded-tl bg-amber-600 p-2">
              <TfiSave size="30px" className="text-white" />
            </div>
            <button
              type="submit"
              className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
            >
              {`${modifica ? "Modifica Maestranza" : "Crea Maestranza"}`}
            </button>
          </div>
        )}
      </form>
      {spinner && (
        <div className="flex flex-col items-center fixed top-[50%]">
          <progress className="progress progress-warning w-56" />
          <label htmlFor="">Creazione in corso</label>
        </div>
      )}
    </>
  );
};

export default ComunicazioniMaestranza;
