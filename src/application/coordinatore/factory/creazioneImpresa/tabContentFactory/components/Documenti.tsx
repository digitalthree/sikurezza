import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    ImpreseDaCreareSelector,
    setFileInDocumenti,
    setImpresaDaCreare,
    setPresenzaInDocumenti
} from "../../../../../../store/impresaSlice";
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {IoAttach, IoCheckmarkDone} from "react-icons/io5";
import {Autodichiarazione} from "../../../../../../model/Impresa";

interface DocumentiProps {
    setTabActive: (s: string) => void
}

export const Documenti: React.FC<DocumentiProps> = ({setTabActive}) => {
    const dispatch = useDispatch()
    const impresaDaCreare = useSelector(ImpreseDaCreareSelector)



    const {handleSubmit} = useForm();
    const onSubmit = () => {setTabActive("Comunicazioni")}


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[60%] p-10 shadow-2xl">

                {impresaDaCreare.documentiIdoneitaImpresa.map((d, index) => {
                    return (
                        <div className="grid grid-cols-5 text-center py-3" key={d.nome}>

                            <div className="col-span-2">
                                <span className="font-bold">{d.nome}</span>
                            </div>
                            <div>
                                <input type="checkbox"
                                       className="toggle"
                                       defaultChecked={d.presenza}
                                       onChange={() => dispatch(setPresenzaInDocumenti({id: index, value: !d.presenza}))}
                                />
                            </div>
                            <div className="col-span-2" key={`div${index}`}>
                                <div className="flex justify-center">
                                    <input type="file" key={`getFile${index}`}
                                           className="w-2/5 file-input file-input-ghost bg-gray-400 font-bold text-white file-input-bordered file-input-xs mr-3 w-1/4 max-w-xs"
                                           onChange={(e) => {
                                               if (e.target.files && e.target.files[0]) {
                                                   let reader = new FileReader();
                                                   reader.readAsDataURL(e.target.files[0]);
                                                   reader.onload = function () {
                                                       if(e.target.files){
                                                           dispatch(setFileInDocumenti({id: index,
                                                               name: e.target.files[0].name,
                                                               value: reader.result as string
                                                           }))
                                                       }
                                                   };
                                               }
                                           }}/>
                                    {(d.file.value) ? <span className="w-3/5">{d.file.name.length < 20 ? d.file.name : d.file.name.substring(0, 20)+"..."}</span>
                                              : <span className="w-3/5">Nessun file selezionato</span>
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
                    <button type="submit"
                            className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                        Salva e Prosegui
                    </button>

                </div>
            </form>
        </>
    )

}