import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImpresaSelezionataSelector } from "../../../store/impresaSlice";
import { uploadFileS3 } from "../../../aws/s3APIs";
import VisualizzaEliminaFile from "../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../shared/Files/InputFile";
import {
  addMacchinaEAttrezzatura,
  MacchinaEAttrezzaturaDaCreareSelector,
  MacchinaEAttrezzaturaSelezionatoSelector,
  removeMacchinaEAttrezzatura,
  setAttributoInMacchinaEAttrezzatura,
  setDocumentoInMacchinaEAttrezzatura,
  setMacchinaEAttrezzaturaDaCreare,
  setMacchinaEAttrezzaturaSelezionato,
  setUltimaRevisioneInMacchinaEAttrezzatura,
} from "../../../store/macchinaEAttrezzaturaSlice";
import {
  MacchinaEAttrezzatura,
  macchinaEAttrezzaturaDefault,
} from "../../../model/MacchineEAttrezzature";
import { useDynamoDBQuery } from "../../../dynamodb/hook/useDynamoDBQuery";
import {
  createMacchinaEAttrezzaturaInDynamo,
  updateMacchinaEAttrezzaturaInDynamo,
} from "../../../dynamodb/api/macchinaEAttrezzaturaAPIs";
import { updateImpresaInDynamo } from "../../../dynamodb/api/impresaAPIs";

export interface CreazioneMacchinaEAttrezzaturaProps {
  editabile: boolean;
  modifica: boolean;
  setModifica: (v: boolean) => void;
  setsaving: (v: boolean) => void;
}

const CreazioneMacchinaEAttrezzatura: React.FC<
  CreazioneMacchinaEAttrezzaturaProps
> = ({ editabile, modifica, setModifica, setsaving }) => {
  const { execQuery2 } = useDynamoDBQuery();
  const dispatch = useDispatch();
  const macchinaEAttrezzaturaSelezionato = useSelector(
    MacchinaEAttrezzaturaSelezionatoSelector
  );
  const macchinaEAttrezzaturaDaCreare = useSelector(
    MacchinaEAttrezzaturaDaCreareSelector
  );
  const impresaSelezionata = useSelector(ImpresaSelezionataSelector);

  //stato utilizzato per rappresentare il click sul pulsante crea/modifica macchina
  const [save, setSave] = useState(false);
  //stato utilizzato per rappresentare l'avvenuto caricamento di tutti i documenti su s3
  const [uploadToDynamo, setUploadToDynamo] = useState(false);
  const [macchinaEAttrezzatura, setMacchinaEAttrezzatura] =
    useState<MacchinaEAttrezzatura>(macchinaEAttrezzaturaDefault);

  const onSubmit = async (macchinaEAttrezzatura: MacchinaEAttrezzatura) => {
    setsaving(true);
    setSave(true)
    // 2. Prepara un array per contenere tutte le Promise di upload S3
    const uploadPromises = macchinaEAttrezzatura.documenti
      .filter((d) => d.file && typeof d.file !== "string") // Filtra solo i documenti con file binari da uplodare
      .map(async (d) => {
        // Mappa ciascuno in una Promise asincrona

        // Upload del file su S3
        const res = await uploadFileS3(d.file as File);

        if (res && res.key) {
          // Troviamo il documento originale nell'array per aggiornare il file (se necessario, a seconda di come gestisci lo stato)
          dispatch(
            setDocumentoInMacchinaEAttrezzatura({
              nome: d.nome,
              value: { nome: d.nome, presenza: d.presenza, file: res.key },
            })
          );
        }
      });
    await Promise.all(uploadPromises);
    setUploadToDynamo(true);
  };

  useEffect(() => {
    if (macchinaEAttrezzaturaSelezionato) {
      setMacchinaEAttrezzatura(macchinaEAttrezzaturaSelezionato);
    } else {
      setMacchinaEAttrezzatura(macchinaEAttrezzaturaDaCreare);
    }
  }, [macchinaEAttrezzaturaDaCreare, macchinaEAttrezzaturaSelezionato]);

  useEffect(() => {
    /*
      Caso 1: creazione di una macchina
        save a true -> pulsante cliccato
        uploadToDynamo a true -> documenti caricati su s3
        modifica a false -> creazione macchina
    */
    if (save && uploadToDynamo && !modifica) {
      let id = crypto.randomUUID();
      execQuery2(createMacchinaEAttrezzaturaInDynamo, {
        ...macchinaEAttrezzatura,
        creatoDa: impresaSelezionata?.id as string,
        id: id,
      }).then((res) => {
        dispatch(
          addMacchinaEAttrezzatura({
            ...macchinaEAttrezzatura,
            id: id,
            creatoDa: impresaSelezionata?.id as string,
          })
        );
        execQuery2(updateImpresaInDynamo, {
          ...impresaSelezionata,
          macchineEAttrezzature: [
            ...(impresaSelezionata?.macchineEAttrezzature as string[]),
            id,
          ],
        });
        dispatch(setMacchinaEAttrezzaturaSelezionato(undefined));
        dispatch(
          setMacchinaEAttrezzaturaDaCreare(macchinaEAttrezzaturaDefault)
        );
      });
      setsaving(false);
      setSave(false)
    }
    /*
      Caso 2: modifica di una macchina già esistente
        save a true -> pulsante cliccato
        uploadToDynamo a true -> documenti caricati su s3
        modifica a true -> modifica macchina esistente
    */
    if (save && uploadToDynamo && modifica) {
      execQuery2(updateMacchinaEAttrezzaturaInDynamo, {
        ...macchinaEAttrezzatura,
        creatoDa: impresaSelezionata?.id as string,
      }).then(() => {
        dispatch(
          removeMacchinaEAttrezzatura(
            macchinaEAttrezzaturaSelezionato?.id as string
          )
        );
        dispatch(
          addMacchinaEAttrezzatura({
            ...macchinaEAttrezzatura,
            creatoDa: impresaSelezionata?.id as string,
          })
        );
        setModifica(false);
        dispatch(setMacchinaEAttrezzaturaSelezionato(undefined));
        dispatch(
          setMacchinaEAttrezzaturaDaCreare(macchinaEAttrezzaturaDefault)
        );
      });
      setsaving(false);
      setSave(false)
    }
  }, [uploadToDynamo, macchinaEAttrezzatura]);

  return (
    <>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <label htmlFor="my-modal-7" className="modal cursor-pointer">
        <label className="modal-box relative max-w-4xl">
          {macchinaEAttrezzatura.attr.map((a) => {
            return (
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold">{a.label}</span>
                {a.nome !== "categoria" ? (
                  <input
                    className="rounded border border-gray-400 shadow p-1 w-[262px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    disabled={!editabile}
                    value={a.value as string}
                    onChange={(e) => {
                      dispatch(
                        setAttributoInMacchinaEAttrezzatura({
                          nome: a.nome,
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                ) : (
                  <select
                    value={a.value as "Macchina" | "Attrezzatura"}
                    onChange={(e) =>
                      dispatch(
                        setAttributoInMacchinaEAttrezzatura({
                          nome: a.nome,
                          value: e.target.value,
                        })
                      )
                    }
                    disabled={!editabile}
                    className="rounded border border-gray-400 shadow p-1"
                  >
                    <option value="Macchina">Macchina</option>
                    <option value="Attrezzatura">Attrezzatura</option>
                  </select>
                )}
              </div>
            );
          })}
          <hr className="mb-3" />
          {macchinaEAttrezzatura.documenti.map((d) => {
            return (
              <div className="grid grid-cols-7 mb-3">
                <span className="font-bold col-span-3">{d.nome}: </span>
                <div className="col-span-1 flex flex-row">
                  NO
                  <input
                    type="checkbox"
                    className="toggle col-span-1 ml-2 mr-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    disabled={!editabile}
                    checked={d.presenza as boolean}
                    onChange={(e) => {
                      dispatch(
                        setDocumentoInMacchinaEAttrezzatura({
                          nome: d.nome,
                          value: { ...d, presenza: e.target.checked },
                        })
                      );
                    }}
                  />
                  SI
                </div>
                <div className="col-span-3 m-auto mr-0">
                  {d.file ? (
                    <VisualizzaEliminaFile
                      file={d.file}
                      modifica={editabile}
                      nome=""
                      eliminaFunction={() => {
                        dispatch(
                          setDocumentoInMacchinaEAttrezzatura({
                            nome: d.nome,
                            value: {
                              ...d,
                              file: undefined,
                            },
                          })
                        );
                      }}
                    />
                  ) : (
                    <InputFile
                      editabile={editabile}
                      onChangeFunction={(e) => {
                        dispatch(
                          setDocumentoInMacchinaEAttrezzatura({
                            nome: d.nome,
                            value: {
                              ...d,
                              file: e.target.files
                                ? e.target.files[0]
                                : undefined,
                            },
                          })
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
          <div className="grid grid-cols-4 gap-10 items-center mb-3">
            <span className="font-bold">
              {macchinaEAttrezzatura.ultimaRevisione.label}:{" "}
            </span>
            <div className="flex flex-col">
              <input
                type="date"
                className="rounded border border-gray-400 shadow p-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                disabled={!editabile}
                value={macchinaEAttrezzatura.ultimaRevisione.effettuataIl}
                onChange={(e) => {
                  dispatch(
                    setUltimaRevisioneInMacchinaEAttrezzatura({
                      nome: macchinaEAttrezzatura.ultimaRevisione.nome,
                      value: {
                        ...macchinaEAttrezzatura.ultimaRevisione,
                        effettuataIl: e.target.value,
                      },
                    })
                  );
                }}
              />
            </div>
            <span className="font-bold">scadenza: </span>
            <input
              type="date"
              className="rounded border border-gray-400 shadow p-1"
              disabled={!editabile}
              value={macchinaEAttrezzatura.ultimaRevisione.scadenza}
              onChange={(e) => {
                dispatch(
                  setUltimaRevisioneInMacchinaEAttrezzatura({
                    nome: macchinaEAttrezzatura.ultimaRevisione.nome,
                    value: {
                      ...macchinaEAttrezzatura.ultimaRevisione,
                      scadenza: e.target.value,
                    },
                  })
                );
              }}
            />
          </div>
          {editabile && (
            <div
              className="modal-action"
              onClick={() => onSubmit(macchinaEAttrezzatura)}
            >
              <label htmlFor="my-modal-7" className="btn btn-warning w-full">
                {editabile && !modifica
                  ? "Crea Macchina o Attrezzatura"
                  : "Modifica Macchina o Attrezzatura"}
              </label>
            </div>
          )}
        </label>
      </label>
    </>
  );
};

export default CreazioneMacchinaEAttrezzatura;
