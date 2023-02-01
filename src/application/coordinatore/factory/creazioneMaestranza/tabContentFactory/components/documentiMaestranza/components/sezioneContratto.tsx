import React from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";

export interface SezioneContrattoProps{
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza,
    onChange: Function
}

const SezioneContratto: React.FC<SezioneContrattoProps> = (
    {
        register, errors, maestranzaDaCreare, onChange
    }
) => {
    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Tipologia Contratto*: </span>
                <div className="flex flex-col col-span-5">
                    <select {...register("tipologiaContratto", {required: true})}
                            defaultValue={maestranzaDaCreare.documenti.contratto.tipologia}
                            className="rounded border border-gray-400 shadow p-1"
                    >
                        <option value="Indeterminato">Indeterminato</option>
                        <option value="Determinato">Determinato</option>
                    </select>
                    {errors.tipologiaContratto && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                </div>
                <div className="flex justify-center col-span-4">
                    <input type="file"
                           className="file-input file-input-secondary file-input-sm w-full max-w-xs"
                           onChange={(e) => {
                               if(e.target.files && e.target.files[0]){
                                   onChange(e.target.files[0], 'contrattoFile')
                               }
                           }}
                    />
                </div>
                {/*(maestranzaDaCreare.documenti.contratto.file.value) ? <span className="col-span-3">{maestranzaDaCreare.documenti.contratto.file.name.length < 20 ? maestranzaDaCreare.documenti.contratto.file.name : maestranzaDaCreare.documenti.contratto.file.name.substring(0, 20)+"..."}</span>
                    : <span className="col-span-3">Nessun file selezionato</span>*/
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Data Assunzione: </span>
                <input type="date" {...register("dataAssunzione")}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       defaultValue={maestranzaDaCreare.documenti.contratto.dataAssunzione}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Data di fine contartto: </span>
                <input type="date" {...register("dataFineContratto")}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       defaultValue={maestranzaDaCreare.documenti.contratto.dataFineContratto}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Mansione: </span>
                <input placeholder="Mansione" {...register("mansione")}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       defaultValue={maestranzaDaCreare.documenti.contratto.mansione}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneContratto