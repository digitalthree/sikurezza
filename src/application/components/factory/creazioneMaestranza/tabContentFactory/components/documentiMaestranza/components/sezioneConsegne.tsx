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
        register,  errors, editabile, modifica
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
    let consegnaDPI = maestranzaSelezionata?.documenti.filter(d => d.nome === 'consegnaDPI')[0].file
    let consegnaTesserino = maestranzaSelezionata?.documenti.filter(d => d.nome === 'consegnaTesserino')[0].file
    const dispatch = useDispatch()

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Consegna DPI: </span>
                <input type="checkbox" className="toggle" {...register('consegnaDPI')}
                       disabled={!editabile}
                       onChange={(e) => dispatch(setConsegnatoInMaestranza({nome: 'consegnaDPI', value: e.target.checked}))}
                       defaultChecked={maestranza.documenti?.filter(d => d.nome === 'consegnaDPI')[0].consegnato}
                />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaDPIConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setConsegnatoIlInMaestranza({nome: 'consegnaDPI', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'consegnaDPI')[0].consegnatoIl}
                />
                {(consegnaDPI || maestranzaDaCreare.documenti.filter(d => d.nome === 'consegnaDPI')[0].file) ?
                    <VisualizzaEliminaFile file={consegnaDPI as string} modifica={editabile} nome="consegnaDPI"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "consegnaDPI", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'consegnaDPI',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Consegna Tesserino: </span>
                <input type="checkbox" className="toggle" {...register('consegnaTesserino')}
                       disabled={!editabile}
                       onChange={(e) => dispatch(setConsegnatoInMaestranza({nome: 'consegnaTesserino', value: e.target.checked}))}
                       defaultChecked={maestranza.documenti?.filter(d => d.nome === 'consegnaTesserino')[0].consegnato}
                />
                <span className="font-bold col-span-2">consegnato il: </span>
                <input type="date" {...register("consegnaTesserinoConsegnatoIl")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setConsegnatoIlInMaestranza({nome: 'consegnaTesserino', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'consegnaTesserino')[0].consegnatoIl}
                />
                {(consegnaTesserino || maestranzaDaCreare.documenti.filter(d => d.nome === 'consegnaTesserino')[0].file) ?
                    <VisualizzaEliminaFile file={consegnaTesserino as string} modifica={editabile} nome="consegnaTesserino"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "consegnaTesserino", file: undefined}))}
                    />:
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