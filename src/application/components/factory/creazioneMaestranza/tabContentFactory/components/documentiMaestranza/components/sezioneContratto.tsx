import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setDataAssunzioneIlInMaestranza, setDataFineContrattoIlInMaestranza,
    setFileInDocumentiMaestranza, setMansioneInMaestranza,
    setTipologiaContrattoInMaestranza,
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

export interface SezioneContrattoProps {
    register: Function,
    errors: FieldErrors,
    editabile: boolean,
    modifica: boolean,
}

const SezioneContratto: React.FC<SezioneContrattoProps> = (
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
    let contratto = maestranzaSelezionata?.documenti.filter(d => d.nome === 'contratto')[0].file
    const dispatch = useDispatch()

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Tipologia Contratto*: </span>
                <div className="flex flex-col col-span-5">
                    <select {...register("tipologiaContratto", {required: true})}
                            defaultValue={maestranza.documenti?.filter(d => d.nome === 'contratto')[0].tipologia}
                            onChange={(e) => dispatch(setTipologiaContrattoInMaestranza(e.target.value as ("Indeterminato")))}
                            disabled={!editabile}
                            className="rounded border border-gray-400 shadow p-1"
                    >
                        <option value="Indeterminato">Indeterminato</option>
                        <option value="Determinato">Determinato</option>
                    </select>
                    {errors.tipologiaContratto && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                </div>
                {(contratto || maestranzaDaCreare.documenti.filter(d => d.nome === 'contratto')[0].file) ?
                    <VisualizzaEliminaFile file={contratto as string} modifica={editabile} nome="contratto"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "contratto", file: undefined}))}
                    />
                    : <div className="flex justify-center col-span-4">
                        <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                            nome: 'contratto',
                            file: (e.target.files) ? e.target.files[0] : undefined
                        }))}/>
                    </div>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Data Assunzione: </span>
                <input type="date" {...register("dataAssunzione")}
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setDataAssunzioneIlInMaestranza(e.target.value))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'contratto')[0].dataAssunzione}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Data di fine contartto: </span>
                <input type="date" {...register("dataFineContratto")}
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setDataFineContrattoIlInMaestranza(e.target.value))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'contratto')[0].dataFineContratto}
                />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Mansione: </span>
                <input placeholder="Mansione" {...register("mansione")}
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setMansioneInMaestranza(e.target.value))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'contratto')[0].mansione}
                />
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneContratto