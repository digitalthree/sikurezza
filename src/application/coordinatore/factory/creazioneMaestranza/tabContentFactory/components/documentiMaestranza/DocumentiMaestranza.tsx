import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    setDocumentiMaestranza
} from "../../../../../../../store/maestranzaSlice";
import {useForm} from "react-hook-form";
import {convertiInDocumentiMaestranza} from "../../utils/conversioneDocumentiMaestranza";
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
}

const DocumentiMaestranza: React.FC<DocumentiMaestranzaProps> = (
    {
        setTabActive
    }
) => {

    const dispatch = useDispatch()
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data: any) => {
        dispatch(setDocumentiMaestranza(convertiInDocumentiMaestranza(data)))
        setTabActive("Comunicazioni")
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="mt-20 w-[70%] p-10 shadow-2xl">
            <SezioneContratto register={register} errors={errors} maestranzaDaCreare={maestranzaDaCreare}/>
            <SezioneVisitaMedica register={register} errors={errors} maestranzaDaCreare={maestranzaDaCreare}/>
            <SezioneCorsoFormazione register={register} errors={errors} maestranzaDaCreare={maestranzaDaCreare}/>
            <SezioneCorsi1 register={register} errors={errors} maestranzaDaCreare={maestranzaDaCreare}/>
            <SezioneConsegne register={register} errors={errors} maestranzaDaCreare={maestranzaDaCreare}/>
            <SezioneNomine register={register} errors={errors} maestranzaDaCreare={maestranzaDaCreare}/>
            <SezioneCorsi2 register={register} errors={errors} maestranzaDaCreare={maestranzaDaCreare}/>
            <div className="flex mt-10">
                <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                    <TfiSave size="30px" className="text-white"/>
                </div>
                <button type="submit" className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                    Salva e Prosegui
                </button>

            </div>
        </form>
    )
}

export default DocumentiMaestranza