import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector, setEffettuatoIlInMaestranza, setFileInDocumentiMaestranza,
    setScadenzaIlInMaestranza
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

export interface SezioneCorsi1Props{
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
    useEffect(() => {
        if(maestranzaSelezionata){
            setMaestranza(maestranzaSelezionata)
        }
    }, [])
    let corsoMacchineMovTerra = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoMacchineMovTerra')[0].file
    let corsoPonteggi = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoPonteggi')[0].file
    let corsoPLE = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoPLE')[0].file
    let corsoConduzioneGRU = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoConduzioneGRU')[0].file
    let corsoGRUSuAutocarro = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].file
    let corsoEscavatoriIdraulici = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].file
    const dispatch = useDispatch()

    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Corso Macchine Mov. Terra: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoMacchineMovTerraEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoMacchineMovTerra', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoMacchineMovTerraScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoMacchineMovTerra', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].scadenza}
                />
                {(corsoMacchineMovTerra || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoMacchineMovTerra')[0].file) ?
                    <VisualizzaEliminaFile file={corsoMacchineMovTerra as string} modifica={editabile} nome="corsoMacchineMovTerra"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoMacchineMovTerra", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoMacchineMovTerra',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Ponteggi: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPonteggiEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPonteggi', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPonteggiScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPonteggi', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].scadenza}
                />
                {(corsoPonteggi || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoPonteggi')[0].file) ?
                    <VisualizzaEliminaFile file={corsoPonteggi as string} modifica={editabile} nome="corsoPonteggi"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPonteggi", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPonteggi',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso PLE: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPLEEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPLE', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPLEScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPLE', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].scadenza}
                />
                {(corsoPLE || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoPLE')[0].file) ?
                    <VisualizzaEliminaFile file={corsoPLE as string} modifica={editabile} nome="corsoPLE"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPLE", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPLE',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Conduzione GRU: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoConduzioneGRUEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoConduzioneGRU', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoConduzioneGRUScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoConduzioneGRU', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].scadenza}
                />
                {(corsoConduzioneGRU || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoConduzioneGRU')[0].file) ?
                    <VisualizzaEliminaFile file={corsoConduzioneGRU as string} modifica={editabile} nome="corsoConduzioneGRU"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoConduzioneGRU", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoConduzioneGRU',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso GRU su Autocarro: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoGRUSuAutocarroEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoGRUSuAutocarro', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoGRUSuAutocarroScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoGRUSuAutocarro', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].scadenza}
                />
                {(corsoGRUSuAutocarro || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].file) ?
                    <VisualizzaEliminaFile file={corsoGRUSuAutocarro as string} modifica={editabile} nome="corsoGRUSuAutocarro"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoGRUSuAutocarro", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoGRUSuAutocarro',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Escavatori Idraulici: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoEscavatoriIdrauliciEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoEscavatoriIdraulici', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoEscavatoriIdrauliciScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoEscavatoriIdraulici', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].scadenza}
                />
                {(corsoEscavatoriIdraulici || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].file) ?
                    <VisualizzaEliminaFile file={corsoEscavatoriIdraulici as string} modifica={editabile} nome="corsoEscavatoriIdraulici"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoEscavatoriIdraulici", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoEscavatoriIdraulici',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneCorsi1