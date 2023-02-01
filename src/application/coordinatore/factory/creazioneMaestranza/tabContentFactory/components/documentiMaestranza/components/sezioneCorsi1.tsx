import React from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";

export interface SezioneCorsi1Props{
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza,
    onChange: Function
}

const SezioneCorsi1: React.FC<SezioneCorsi1Props> = (
    {
        register, errors, maestranzaDaCreare, onChange
    }
) => {
    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Corso Macchine Mov. Terra: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoMacchineMovTerraEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoMacchineMovTerra?.effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoMacchineMovTerraScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoMacchineMovTerra?.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'corsoMacchineMovTerraFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Ponteggi: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPonteggiEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoPonteggi?.effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPonteggiScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoPonteggi?.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                               if(e.target.files && e.target.files[0]){
                                   onChange(e.target.files[0], 'corsoPonteggiFile')
                               }
                           }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso PLE: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPLEEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoPLE?.effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPLEScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoPLE?.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                               if(e.target.files && e.target.files[0]){
                                   onChange(e.target.files[0], 'corsoPLEFile')
                               }
                           }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Conduzione GRU: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoConduzioneGRUEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoConduzioneGRU?.effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoConduzioneGRUScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoConduzioneGRU?.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                               if(e.target.files && e.target.files[0]){
                                   onChange(e.target.files[0], 'corsoConduzioneGRUFile')
                               }
                           }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso GRU su Autocarro: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoGRUSuAutocarroEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoGRUSuAutocarro?.effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoGRUSuAutocarroScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoGRUSuAutocarro?.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                               if(e.target.files && e.target.files[0]){
                                   onChange(e.target.files[0], 'corsoGRUSuAutocarroFile')
                               }
                           }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Escavatori Idraulici: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoEscavatoriIdrauliciEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={maestranzaDaCreare.documenti.corsoEscavatoriIdraulici?.effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoEscavatoriIdrauliciScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.corsoEscavatoriIdraulici?.scadenza}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                               if(e.target.files && e.target.files[0]){
                                   onChange(e.target.files[0], 'corsoEscavatoriIdrauliciFile')
                               }
                           }}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneCorsi1