import React from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";

export interface SezioneNomineProps{
    register: Function,
    errors: FieldErrors,
    maestranzaDaCreare: Maestranza
}

const SezioneNomine: React.FC<SezioneNomineProps> = (
    {
        register, errors, maestranzaDaCreare
    }
) => {
    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Nomina da Preposto: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaPreposto')}
                       defaultChecked={maestranzaDaCreare.documenti.nominaDaPreposto.nomina} />
                <span className="col-span-4"></span>
                <input type="file" {...register("nominaDaPrepostoFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da RSPP: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaRSPP')}
                       defaultChecked={maestranzaDaCreare.documenti.nominaDaRSPP.nomina} />
                <span className="col-span-4"></span>
                <input type="file" {...register("nominaDaRSPPFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da RLS: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaRLS')}
                       defaultChecked={maestranzaDaCreare.documenti.nominaDaRLS.nomina} />
                <span className="col-span-4"></span>
                <input type="file" {...register("nominaDaRLSFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da AddettoPSoccorso: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaAddettoPSoccorso')}
                       defaultChecked={maestranzaDaCreare.documenti.nominaDaAddettoPSoccorso.nomina} />
                <span className="col-span-4"></span>
                <input type="file" {...register("nominaDaAddettoPSoccorsoFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Nomina da AddettoPrevIncendi: </span>
                <input type="checkbox" className="toggle" {...register('nominaDaAddettoPrevIncendi')}
                       defaultChecked={maestranzaDaCreare.documenti.nominaDaAddettoPrevIncendi.nomina} />
                <span className="col-span-4"></span>
                <input type="file" {...register("nominaDaAddettoPrevIncendiFile")}
                       className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"/>
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneNomine