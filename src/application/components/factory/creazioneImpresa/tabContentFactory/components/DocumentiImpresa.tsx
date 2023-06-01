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
}

export const DocumentiImpresa: React.FC<DocumentiProps> = (
    {
        setTabActive, editabile
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



    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="w-[80%] p-10 shadow-2xl">
                {impresa.documentiIdoneitaImpresa.map((d, index) => {
                    return (
                        <div className="grid grid-cols-5 text-center py-3" key={d.nome}>

                            <div className="col-span-2">
                                <span className="font-bold">{d.nome}</span>
                            </div>
                            <div className="flex flex-row justify-center">
                                NO
                                <input type="checkbox"
                                       className="toggle ml-2 mr-2"
                                       checked={d.presenza}
                                       onChange={() => dispatch(setPresenzaInDocumenti({
                                           id: index,
                                           value: !d.presenza
                                       }))}
                                />
                                SI
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
                                </div>

                            </div>
                        </div>
                    )
                })}

                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button onClick={() => setTabActive("Comunicazioni")}
                            className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                        Salva e Prosegui
                    </button>

                </div>
            </form>
        </>
    )

}