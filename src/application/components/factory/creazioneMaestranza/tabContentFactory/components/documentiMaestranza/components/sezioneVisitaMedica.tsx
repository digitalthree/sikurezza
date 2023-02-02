import React from 'react';
import {FieldErrors, FieldValues} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";

export interface SezioneVisitaMedicaProps{
    register: Function,
    errors: FieldErrors<FieldValues>,
    maestranzaDaCreare: Maestranza,
    onChange: Function
}

const SezioneVisitaMedica: React.FC<SezioneVisitaMedicaProps> = (
    {
        register, errors, maestranzaDaCreare, onChange
    }
) => {
    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Visita Medica effettuata il*: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("visitaMedicaEffettuataIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'visitaMedica')[0].effettuatoIl}
                    />
                    {errors.visitaMedicaEffettuataIl && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("visitaMedicascadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'visitaMedica')[0].scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'visitaMedicaFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 mt-2">
                <span className="font-bold col-span-3">Prescrizioni o limitazioni: </span>
                <textarea {...register("prescrizioniLimitazioni")}
                       className="rounded border border-gray-400 shadow p-1 col-span-9 w-1/2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'visitaMedica')[0].prescrizioniLimitazioni}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneVisitaMedica