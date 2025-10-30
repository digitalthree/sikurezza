import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    addCorsoMaestranza,
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setConsegnatoInMaestranza,
    setEffettuatoIlInMaestranza, setFileInCorsiMaestranza,
    setFileInDocumentiMaestranza, setMansioneInMaestranza, setRichiedibileInCorsoMaestranza,
    setRichiedibileInMaestranza,
    setScadenzaIlInMaestranza
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

export interface SezioneCorsi1Props {
    register: Function,
    errors: FieldErrors,
    editabile: boolean,
    modifica: boolean,
}

const SezioneCorsi1: React.FC<SezioneCorsi1Props> = (
    {
        register, errors, editabile, modifica
    }
) => {

    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const [maestranza, setMaestranza] = useState(maestranzaDaCreare)
    const [corsoDaAggiungere, setCorsoDaAggiungere] = useState("")
    useEffect(() => {
        if (maestranzaSelezionata) {
            setMaestranza(maestranzaSelezionata)
        } else {
            setMaestranza(maestranzaDaCreare)
        }
    }, [maestranzaSelezionata, maestranzaDaCreare])

    useEffect(() => {
        console.log("maestranza aggiornata: ", maestranza)
    }, [maestranza])

    const dispatch = useDispatch()

    return (
        <>
            {maestranza.corsi.map(c => {
                return (
                    <div className="grid grid-cols-12 gap-4 mb-3" key={c.nome}>
                        <span className="font-bold col-span-2">{c.label}</span>
                        <div className="col-span-1 flex flex-row">
                            NR
                            <input type="checkbox" className="toggle ml-2 mr-2"
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") {
                                           e.preventDefault()
                                       }
                                   }}
                                   disabled={!editabile}
                                   onChange={(e) => dispatch(setRichiedibileInCorsoMaestranza({
                                       nome: c.nome,
                                       value: !e.target.checked
                                   }))}
                                   defaultChecked={!maestranza.corsi?.filter(d => d.nome === c.nome)[0].richiedibile}
                            />
                        </div>
                        <span className="font-bold col-span-1">scadenza: </span>
                        <input type="date"
                               className="rounded border border-gray-400 shadow p-1 col-span-5"
                               onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile || !maestranza.corsi?.filter(d => d.nome === c.nome)[0].richiedibile}
                               onChange={(e) => {
                                dispatch(setScadenzaIlInMaestranza({
                                   nome: c.nome,
                                   value: e.target.value
                               }))}}
                               defaultValue={maestranza.corsi?.filter(d => d.nome === c.nome)[0].scadenza}
                        />
                        {c.file ?
                            <VisualizzaEliminaFile file={c.file as string | File} modifica={editabile}
                                                   nome={c.nome}
                                                   eliminaFunction={() => dispatch(setFileInCorsiMaestranza({
                                                       nome: c.nome,
                                                       file: undefined
                                                   }))}
                            /> :
                            <InputFile
                                editabile={editabile && maestranza.corsi?.filter(d => d.nome === c.nome)[0].richiedibile as boolean}
                                onChangeFunction={(e) => dispatch(setFileInCorsiMaestranza({
                                    nome: c.nome,
                                    file: (e.target.files) ? e.target.files[0] : undefined
                                }))}/>
                        }
                    </div>
                )
            })}
            {/* The button to open modal */}
            {editabile &&
                <div className="w-full flex flex-row justify-center mt-4">
                    <label htmlFor="my_modal_6" className="btn btn-sm btn-warning w-1/2">Aggiungi Corso</label>

                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my_modal_6" className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Nuovo Corso</h3>

                            <input placeholder="Nome"
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") {
                                           e.preventDefault()
                                       }
                                   }}
                                   className="rounded border border-gray-400 shadow p-1 w-full mt-5"
                                   onChange={(e) => setCorsoDaAggiungere(e.target.value)}
                                   defaultValue={corsoDaAggiungere}
                            />

                            <div className="modal-action flex-row justify-between">
                                <label htmlFor="my_modal_6" className="btn btn-error btn-sm">Annulla</label>
                                <label htmlFor="my_modal_6" className="btn btn-warning btn-sm"
                                       onClick={() => {
                                           dispatch(addCorsoMaestranza(corsoDaAggiungere))
                                       }}
                                >
                                    Aggiungi
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <hr className="my-5"/>
        </>
    )
}

export default SezioneCorsi1