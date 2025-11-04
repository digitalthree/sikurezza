import React from 'react';
import {useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector, MaestranzaSelezionataSelector,
} from "../../../../../../../store/maestranzaSlice";
import {useForm} from "react-hook-form";
import SezioneContratto from "./components/sezioneContratto";
import SezioneVisitaMedica from "./components/sezioneVisitaMedica";
import SezioneCorsoFormazione from "./components/sezioneCorsoFormazione";
import SezioneCorsi1 from "./components/sezioneCorsi1";
import SezioneConsegne from "./components/sezioneConsegne";
import SezioneNomine from "./components/sezioneNomine";
import SezioneCorsi2 from "./components/sezioneCorsi2";
import {TfiSave} from "react-icons/tfi";

export interface DocumentiMaestranzaProps{
    setTabActive: (s:string) => void,
    editabile: boolean,
    modifica: boolean,
}

const DocumentiMaestranza: React.FC<DocumentiMaestranzaProps> = (
    {
        setTabActive, editabile, modifica
    }
) => {


    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    console.log(maestranzaSelezionata)
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const {register, formState: {errors}} = useForm();


    return(
        <>
            <form className="w-[100%] p-10 shadow-2xl">
                {maestranzaSelezionata &&
                    <div className="flex flex-row w-full justify-center mb-5">
                        <h2 className="text-xl rounded border border-gray-500 p-2">{maestranzaSelezionata.anagrafica.filter(a => a.label === "nome")[0].value} {maestranzaSelezionata.anagrafica.filter(a => a.label === "cognome")[0].value}</h2>
                    </div>
                }
                {!maestranzaSelezionata && maestranzaDaCreare.anagrafica.filter(a => a.label === "nome")[0].value !== "" && maestranzaDaCreare.anagrafica.filter(a => a.label === "nome")[0].value !== "" &&
                    <div className="flex flex-row w-full justify-center mb-10">
                        <h2 className="text-xl rounded border border-gray-500 p-2">{maestranzaDaCreare.anagrafica.filter(a => a.label === "nome")[0].value} {maestranzaDaCreare.anagrafica.filter(a => a.label === "cognome")[0].value}</h2>
                    </div>
                }

                <SezioneContratto register={register} errors={errors} editabile={editabile} modifica={modifica}/>
                <SezioneVisitaMedica register={register} errors={errors} editabile={editabile} modifica={modifica}/>
                <SezioneCorsoFormazione register={register} errors={errors} editabile={editabile} modifica={modifica}/>
                <SezioneCorsi1 register={register} errors={errors} editabile={editabile} modifica={modifica}/>
                <SezioneConsegne register={register} errors={errors} editabile={editabile} modifica={modifica}/>
                <SezioneNomine register={register} errors={errors} editabile={editabile} modifica={modifica}/>
                <SezioneCorsi2 register={register} errors={errors} editabile={editabile} modifica={modifica}/>
                {editabile &&
                    <div className="flex mt-10">
                        <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                            <TfiSave size="30px" className="text-white"/>
                        </div>
                        <button onClick={() => setTabActive("Comunicazioni")}
                                className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                            Salva e Prosegui
                        </button>

                    </div>
                }
            </form>
        </>

    )
}

export default DocumentiMaestranza