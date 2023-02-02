import React from 'react';
import {FieldErrors, useForm} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";;

export interface SezioneConsegneProps {
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza
    onChange: Function
}

const SezioneConsegne: React.FC<SezioneConsegneProps> = (
    {
        register,  errors, maestranzaDaCreare, onChange
    }
) => {


    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Consegna DPI: </span>
                <input type="checkbox" className="toggle" {...register('consegnaDPI')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'consegnaDPI')[0].consegnato} />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaDPIConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'consegnaDPI')[0].consegnatoIl}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if(e.target.files && e.target.files[0]){
                               onChange(e.target.files[0], 'consegnaDPIFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Consegna DPI Covid: </span>
                <input type="checkbox" className="toggle" {...register('consegnaDPICovid')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'consegnaDPICovid')[0].consegnato} />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaDPICovidConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'consegnaDPICovid')[0].consegnatoIl}
                />
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if(e.target.files && e.target.files[0]){
                               onChange(e.target.files[0], 'consegnaDPICovidFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Consegna Tesserino: </span>
                <input type="checkbox" className="toggle" {...register('consegnaTesserino')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'consegnaTesserino')[0].consegnato} />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaTesserinoConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       defaultValue={maestranzaDaCreare.documenti?.filter(d => d.nome === 'consegnaTesserino')[0].consegnatoIl}
                />
                <input type="file" className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if(e.target.files && e.target.files[0]){
                               onChange(e.target.files[0], 'consegnaTesserinoFile')
                           }
                       }}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneConsegne