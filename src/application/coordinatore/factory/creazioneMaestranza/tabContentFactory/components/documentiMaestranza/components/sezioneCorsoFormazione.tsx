import React from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";

export interface SezioneCorsoFormazioneProps{
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza,
    onChange: Function
}

const SezioneCorsoFormazione: React.FC<SezioneCorsoFormazioneProps> = (
    {
        register, errors, maestranzaDaCreare, onChange
    }
) => {
    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Corso Formazione art. 36/37*: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoFormazioneArt3637EffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoFormazioneArt3637.effettuatoIl}
                    />
                    {errors.corsoFormazioneArt3637EffettuatoIl && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoFormazioneArt3637Scadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoFormazioneArt3637.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoFormazioneArt3637File')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Formazione e info. COVID: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoFormazioneCovidEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoFormazioneCovid.effettuatoIl}
                    />
                    {errors.corsoFormazioneCovidEffettuatoIl && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoFormazioneCovidScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoFormazioneCovid.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoFormazioneCovidFile')
                           }
                       }}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneCorsoFormazione