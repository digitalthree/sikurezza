import React from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";

export interface SezioneNomineProps{
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza,
    onChange: Function
}

const SezioneNomine: React.FC<SezioneNomineProps> = (
    {
        register, errors, maestranzaDaCreare, onChange
    }
) => {
    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Nomina da Preposto: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaPreposto')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'nominaDaPreposto')[0].nomina} />
                <span className="col-span-4"></span>
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'nominaDaPrepostoFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da RSPP: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaRSPP')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'nominaDaRSPP')[0].nomina} />
                <span className="col-span-4"></span>
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'nominaDaRSPPFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da RLS: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaRLS')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'nominaDaRLS')[0].nomina} />
                <span className="col-span-4"></span>
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'nominaDaRLSFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da AddettoPSoccorso: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaAddettoPSoccorso')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'nominaDaAddettoPSoccorso')[0].nomina} />
                <span className="col-span-4"></span>
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'nominaDaAddettoPSoccorsoFile')
                           }
                       }}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da AddettoPrevIncendi: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaAddettoPrevIncendi')}
                       defaultChecked={maestranzaDaCreare.documenti?.filter(d => d.nome === 'nominaDaAddettoPrevIncendi')[0].nomina} />
                <span className="col-span-4"></span>
                <input type="file"
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                       onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                               onChange(e.target.files[0], 'nominaDaAddettoPrevIncendiFile')
                           }
                       }}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneNomine