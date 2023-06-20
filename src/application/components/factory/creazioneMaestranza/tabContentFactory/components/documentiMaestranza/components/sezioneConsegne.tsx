import React, {useEffect, useState} from 'react';
import {FieldErrors, useForm} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector, setConsegnatoIlInMaestranza, setConsegnatoInMaestranza,
    setEffettuatoIlInMaestranza, setFileInDocumentiMaestranza
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

;

export interface SezioneConsegneProps {
    register: Function,
    errors: FieldErrors,
    editabile: boolean,
    modifica: boolean,
}

const SezioneConsegne: React.FC<SezioneConsegneProps> = (
    {
        register, errors, editabile, modifica
    }
) => {

    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const [maestranza, setMaestranza] = useState(maestranzaDaCreare)
    useEffect(() => {
        if (maestranzaSelezionata) {
            setMaestranza(maestranzaSelezionata)
        }else{
            setMaestranza(maestranzaDaCreare)
        }
    }, [maestranzaSelezionata, maestranzaDaCreare])
    let consegnaDPI = maestranza?.documenti.filter(d => d.nome === 'consegnaDPI')[0].file
    let consegnaTesserino = maestranza?.documenti.filter(d => d.nome === 'consegnaTesserino')[0].file
    const dispatch = useDispatch()

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-2">Consegna DPI: </span>
                <div className="col-span-1 flex flex-row">
                    NO
                    <input type="checkbox" className="toggle ml-2 mr-2" {...register('consegnaDPI')}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setConsegnatoInMaestranza({
                               nome: 'consegnaDPI',
                               value: e.target.checked
                           }))}
                           defaultChecked={maestranza.documenti?.filter(d => d.nome === 'consegnaDPI')[0].consegnato}
                    />
                    SI
                </div>
                <span className="font-bold col-span-1">consegnato il: </span>
                <input type="date" {...register("consegnaDPIConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       onKeyDown={(e) => {
                           if (e.key === "Enter") {
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile}
                       onChange={(e) => dispatch(setConsegnatoIlInMaestranza({
                           nome: 'consegnaDPI',
                           value: e.target.value
                       }))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'consegnaDPI')[0].consegnatoIl}
                />
                {consegnaDPI ?
                    <VisualizzaEliminaFile file={consegnaDPI} modifica={editabile} nome="consegnaDPI"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({
                                               nome: "consegnaDPI",
                                               file: undefined
                                           }))}
                    /> :
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'consegnaDPI',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Consegna Tesserino: </span>
                <div className="col-span-1 flex flex-row">
                    NO
                    <input type="checkbox" className="toggle ml-2 mr-2" {...register('consegnaTesserino')}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setConsegnatoInMaestranza({
                               nome: 'consegnaTesserino',
                               value: e.target.checked
                           }))}
                           defaultChecked={maestranza.documenti?.filter(d => d.nome === 'consegnaTesserino')[0].consegnato}
                    />
                    SI
                </div>
                <span className="font-bold col-span-1">consegnato il: </span>
                <input type="date" {...register("consegnaTesserinoConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-5"
                       onKeyDown={(e) => {
                           if (e.key === "Enter") {
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile}
                       onChange={(e) => dispatch(setConsegnatoIlInMaestranza({
                           nome: 'consegnaTesserino',
                           value: e.target.value
                       }))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'consegnaTesserino')[0].consegnatoIl}
                />
                {consegnaTesserino ?
                    <VisualizzaEliminaFile file={consegnaTesserino} modifica={editabile}
                                           nome="consegnaTesserino"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({
                                               nome: "consegnaTesserino",
                                               file: undefined
                                           }))}
                    /> :
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'consegnaTesserino',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneConsegne