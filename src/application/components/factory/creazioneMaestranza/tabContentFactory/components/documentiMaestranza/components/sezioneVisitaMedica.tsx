import React, {useEffect, useState} from 'react';
import {FieldErrors, FieldValues} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector, setDocumentiMaestranza, setEffettuatoIlInMaestranza, setFileInDocumentiMaestranza,
    setPrescrizioniLimitazioniInMaestranza, setScadenzaIlInMaestranza
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

export interface SezioneVisitaMedicaProps {
    register: Function,
    errors: FieldErrors<FieldValues>,
    editabile: boolean,
    modifica: boolean,
}

const SezioneVisitaMedica: React.FC<SezioneVisitaMedicaProps> = (
    {
        register, errors, modifica, editabile
    }
) => {

    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const [maestranza, setMaestranza] = useState(maestranzaDaCreare)
    useEffect(() => {
        if(maestranzaSelezionata){
            setMaestranza(maestranzaSelezionata)
        }else{
            setMaestranza(maestranzaDaCreare)
        }
    }, [maestranzaSelezionata, maestranzaDaCreare])
    let visitaMedica = maestranza?.documenti.filter(d => d.nome === 'visitaMedica')[0].file
    const dispatch = useDispatch()

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Visita Medica: </span>
                <span className="font-bold col-span-1">svolta il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("visitaMedicaEffettuataIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'visitaMedica', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'visitaMedica')[0].effettuatoIl}
                    />
                    {errors.visitaMedicaEffettuataIl &&
                        <span className="font-bold text-red-600">Campo obbligatorio</span>}
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("visitaMedicascadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'visitaMedica', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'visitaMedica')[0].scadenza}
                />
                {visitaMedica ?
                    <VisualizzaEliminaFile file={visitaMedica} modifica={editabile} nome="visitaMedica"
                        eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "visitaMedica", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({nome: 'visitaMedica', file: (e.target.files) ? e.target.files[0] : undefined}))}/>
                }
            </div>
            <div className="grid grid-cols-12 mt-2">
                <span className="font-bold col-span-3">Prescrizioni o limitazioni: </span>
                <textarea {...register("prescrizioniLimitazioni")}
                          className="rounded border border-gray-400 shadow p-1 col-span-9 w-2/3"
                          onKeyDown={(e) => {
                              if(e.key === "Enter"){
                                  e.preventDefault()
                              }
                          }}
                          disabled={!editabile}
                          onChange={(e) => dispatch(setPrescrizioniLimitazioniInMaestranza(e.target.value))}
                          defaultValue={maestranza.documenti?.filter(d => d.nome === 'visitaMedica')[0].prescrizioniLimitazioni}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneVisitaMedica