import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    ImpresaSelezionataSelector,
    ImpreseDaCreareSelector,
    setFileInDocumenti,
    setPresenzaInDocumenti
} from "../../../../../../store/impresaSlice";
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {Impresa, impresaTemporanea} from "../../../../../../model/Impresa";
import VisualizzaEliminaFile from "../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../shared/Files/InputFile";

interface DocumentiProps {
    setTabActive: (s: string) => void,
    editabile: boolean,
    modifica: boolean,
    setModifica: (v: boolean) => void
}

export const DocumentiImpresa: React.FC<DocumentiProps> = (
    {
        setTabActive, editabile, modifica, setModifica
    }
) => {

    const dispatch = useDispatch()
    const impresaDaCreare = useSelector(ImpreseDaCreareSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const [impresa, setImpresa] = useState(impresaTemporanea)

    useEffect(() => {
        if(impresaSelezionata){
            setImpresa(impresaSelezionata)
        }else{
            setImpresa(impresaDaCreare)
        }
    }, [impresaSelezionata, impresaDaCreare])


    const {handleSubmit} = useForm();
    const onSubmit = () => {
        setTabActive("Comunicazioni")
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] p-10 shadow-2xl">
                {impresa.documentiIdoneitaImpresa.map((d, index) => {
                    return (
                        <div className="grid grid-cols-5 text-center py-3" key={d.nome}>

                            <div className="col-span-2">
                                <span className="font-bold">{d.nome}</span>
                            </div>
                            <div>
                                <input type="checkbox"
                                       className="toggle"
                                       defaultChecked={d.presenza}
                                       onChange={() => dispatch(setPresenzaInDocumenti({
                                           id: index,
                                           value: !d.presenza
                                       }))}
                                />
                            </div>
                            <div className="col-span-2" key={`div${index}`}>
                                <div className="flex justify-center">
                                    {d.file.value ?
                                        <VisualizzaEliminaFile file={d.file.value} modifica={editabile} nome="" eliminaFunction={() => {
                                            dispatch(setFileInDocumenti({
                                                nome: d.nome,
                                                file: {nome: "", value: undefined}
                                            }))
                                        }}/> :
                                        <InputFile editabile={editabile} onChangeFunction={(e) => {
                                            dispatch(setFileInDocumenti({
                                                nome: d.nome,
                                                file: {nome: d.nome, value: (e.target.files) ? e.target.files[0] : undefined}
                                            }))
                                        }}/>
                                    }
                                    {/*<input type="file" key={`getFile${index}`}
                                           className={`file-input file-input-secondary file-input-sm max-w-xs ${d.file.value ? 'w-1/4' : 'w-full'}`}
                                           onChange={(e) => {
                                               if (e.target.files && e.target.files[0]) {
                                                   dispatch(setFileInDocumenti({
                                                       nome: d.nome,
                                                       file: {nome: e.target.files[0].name, value: e.target.files[0]}
                                                   }))
                                               }
                                           }}/>
                                    {(d.file) ?
                                        <span className="w-3/5 hover:underline hover:cursor-pointer"
                                              onClick={() => {
                                                  if (impresaSelezionata) {
                                                      s3.getObject({
                                                          Bucket: process.env.REACT_APP_AWS_BUCKET_NAME as string,
                                                          Key: d.file.value as string,
                                                      }, (err, data) => {
                                                          if (data) {
                                                              const file = new Blob([data.Body as Uint8Array], {type: "application/pdf"})
                                                              const fileURL = URL.createObjectURL(file);
                                                              const pdfWindow = window.open();
                                                              if (pdfWindow) {
                                                                  pdfWindow.location.href = fileURL;
                                                              }
                                                          }
                                                      })

                                                  } else {
                                                      const fileURL = URL.createObjectURL(d.file.value as File);
                                                      const pdfWindow = window.open();
                                                      if (pdfWindow) {
                                                          pdfWindow.location.href = fileURL;
                                                      }
                                                  }
                                              }
                                              }
                                        >
                                            {d.file.nome.length < 20 ? d.file.nome : d.file.nome.substring(0, 20) + "..."}
                                    </span>
                                        : <span className="w-3/5">Nessun file selezionato</span>
                                    }*/}
                                </div>

                            </div>
                        </div>
                    )
                })}

                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button type="submit"
                            className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                        Salva e Prosegui
                    </button>

                </div>
            </form>
        </>
    )

}