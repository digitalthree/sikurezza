import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setEffettuatoIlInMaestranza, setScadenzaIlInMaestranza
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

export interface SezioneCorsoFormazioneProps{
    register: Function,
    errors: FieldErrors,
    editabile: boolean,
    modifica: boolean,
}

const SezioneCorsoFormazione: React.FC<SezioneCorsoFormazioneProps> = (
    {
        register, errors, editabile, modifica
    }
) => {

    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const [maestranza, setMaestranza] = useState(maestranzaDaCreare)
    useEffect(() => {
        if(maestranzaSelezionata){
            setMaestranza(maestranzaSelezionata)
        }
    }, [])
    let corsoFormazioneArt37 = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoFormazioneArt37')[0].file
    const dispatch = useDispatch()

    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Corso Formazione art. 37*: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoFormazioneArt3637EffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoFormazioneArt37', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoFormazioneArt37')[0].effettuatoIl}
                    />
                    {errors.corsoFormazioneArt3637EffettuatoIl && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoFormazioneArt3637Scadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoFormazioneArt37', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoFormazioneArt37')[0].scadenza}
                />
                {(corsoFormazioneArt37 || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoFormazioneArt37')[0].file) ?
                    <VisualizzaEliminaFile file={corsoFormazioneArt37 as string} modifica={editabile} nome="corsoFormazioneArt37"/>:
                    <InputFile editabile={editabile} nome="corsoFormazioneArt37"/>
                }
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneCorsoFormazione