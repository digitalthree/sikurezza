import React from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";

export interface SezioneCorsi1Props{
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza,
    onChange: Function
}

const SezioneCorsi2: React.FC<SezioneCorsi1Props> = (
    {
        register, errors, maestranzaDaCreare, onChange
    }
) => {
    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Corso Primo Soccorso: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrimoSoccorsoEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrimoSoccorsoScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoPrimoSoccorsoFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Prev. Incendi: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrevIncendiEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrevIncendiScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoPrevIncendiFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Preposto: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrepostoEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoPreposto')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrepostoScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoPreposto')[0].scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoPrepostoFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso RLS: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoRLSEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoRLS')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoRLSScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoRLS')[0].scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoRLSFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso RSPP: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoRSPPEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoRSPP')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoRSPPScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'corsoRSPP')[0].scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoRSPPFile')
                           }
                       }}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneCorsi2