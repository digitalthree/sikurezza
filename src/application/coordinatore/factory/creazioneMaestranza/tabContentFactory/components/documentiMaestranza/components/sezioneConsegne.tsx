import React from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza, maestranzaDefault} from "../../../../../../../../model/Maestranza";

export interface SezioneConsegneProps {
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza
}

const SezioneConsegne: React.FC<SezioneConsegneProps> = (
    {
        register, errors, maestranzaDaCreare
    }
) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Consegna DPI: </span>
                <input type="checkbox" className="toggle" {...register('consegnaDPI')}
                       defaultChecked={maestranzaDaCreare.documenti.consegnaDPI.consegnato} />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaDPIConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.consegnaDPI.consegnatoIl}
                />
                <input type="file" {...register("consegnaDPIFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Consegna DPI Covid: </span>
                <input type="checkbox" className="toggle" {...register('consegnaDPICovid')}
                       defaultChecked={maestranzaDaCreare.documenti.consegnaDPICovid.consegnato} />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaDPICovidConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.consegnaDPICovid.consegnatoIl}
                />
                <input type="file" {...register("consegnaDPICovidFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Consegna Tesserino: </span>
                <input type="checkbox" className="toggle" {...register('consegnaTesserino')}
                       defaultChecked={maestranzaDaCreare.documenti.consegnaTesserino.consegnato} />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaTesserinoConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti.consegnaTesserino.consegnatoIl}
                />
                <input type="file" {...register("consegnaTesserinoFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneConsegne