import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setConsegnatoInMaestranza,
    setEffettuatoIlInMaestranza,
    setFileInDocumentiMaestranza,
    setRichiedibileInMaestranza,
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
        }else{
            setMaestranza(maestranzaDaCreare)
        }
    }, [maestranzaSelezionata, maestranzaDaCreare])
    let corsoMacchineMovTerra = maestranza?.documenti.filter(d => d.nome === 'corsoMacchineMovTerra')[0].file
    let corsoPonteggi = maestranza?.documenti.filter(d => d.nome === 'corsoPonteggi')[0].file
    let corsoPLE = maestranza?.documenti.filter(d => d.nome === 'corsoPLE')[0].file
    let corsoConduzioneGRU = maestranza?.documenti.filter(d => d.nome === 'corsoConduzioneGRU')[0].file
    let corsoGRUSuAutocarro = maestranza?.documenti.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].file
    let corsoEscavatoriIdraulici = maestranza?.documenti.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].file
    const dispatch = useDispatch()

    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-2">Corso Macchine Mov. Terra: </span>
                <div className="col-span-1 flex flex-row">
                    NR
                    <input type="checkbox" className="toggle ml-2 mr-2"
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setRichiedibileInMaestranza({
                               nome: 'corsoMacchineMovTerra',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoMacchineMovTerraEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoMacchineMovTerra', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoMacchineMovTerraScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoMacchineMovTerra', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].scadenza}
                />
                {corsoMacchineMovTerra ?
                    <VisualizzaEliminaFile file={corsoMacchineMovTerra} modifica={editabile} nome="corsoMacchineMovTerra"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoMacchineMovTerra", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoMacchineMovTerra')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoMacchineMovTerra',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso Ponteggi: </span>
                <div className="col-span-1 flex flex-row">
                    NR
                    <input type="checkbox" className="toggle ml-2 mr-2"
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setRichiedibileInMaestranza({
                               nome: 'corsoPonteggi',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPonteggiEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPonteggi', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPonteggiScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPonteggi', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].scadenza}
                />
                {corsoPonteggi ?
                    <VisualizzaEliminaFile file={corsoPonteggi} modifica={editabile} nome="corsoPonteggi"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPonteggi", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoPonteggi')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPonteggi',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso PLE: </span>
                <div className="col-span-1 flex flex-row">
                    NR
                    <input type="checkbox" className="toggle ml-2 mr-2"
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setRichiedibileInMaestranza({
                               nome: 'corsoPLE',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPLEEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPLE', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPLEScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPLE', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].scadenza}
                />
                {corsoPLE ?
                    <VisualizzaEliminaFile file={corsoPLE} modifica={editabile} nome="corsoPLE"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPLE", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoPLE')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPLE',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso Conduzione GRU: </span>
                <div className="col-span-1 flex flex-row">
                    NR
                    <input type="checkbox" className="toggle ml-2 mr-2"
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setRichiedibileInMaestranza({
                               nome: 'corsoConduzioneGRU',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoConduzioneGRUEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoConduzioneGRU', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoConduzioneGRUScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoConduzioneGRU', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].scadenza}
                />
                {corsoConduzioneGRU ?
                    <VisualizzaEliminaFile file={corsoConduzioneGRU} modifica={editabile} nome="corsoConduzioneGRU"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoConduzioneGRU", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoConduzioneGRU')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoConduzioneGRU',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso GRU su Autocarro: </span>
                <div className="col-span-1 flex flex-row">
                    NR
                    <input type="checkbox" className="toggle ml-2 mr-2"
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setRichiedibileInMaestranza({
                               nome: 'corsoGRUSuAutocarro',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoGRUSuAutocarroEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={(!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].richiedibile)}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoGRUSuAutocarro', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoGRUSuAutocarroScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoGRUSuAutocarro', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].scadenza}
                />
                {corsoGRUSuAutocarro ?
                    <VisualizzaEliminaFile file={corsoGRUSuAutocarro} modifica={editabile} nome="corsoGRUSuAutocarro"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoGRUSuAutocarro", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoGRUSuAutocarro')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoGRUSuAutocarro',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso Escavatori Idraulici: </span>
                <div className="col-span-1 flex flex-row">
                    NR
                    <input type="checkbox" className="toggle ml-2 mr-2"
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile}
                           onChange={(e) => dispatch(setRichiedibileInMaestranza({
                               nome: 'corsoEscavatoriIdraulici',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoEscavatoriIdrauliciEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoEscavatoriIdraulici', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoEscavatoriIdrauliciScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoEscavatoriIdraulici', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].scadenza}
                />
                {corsoEscavatoriIdraulici ?
                    <VisualizzaEliminaFile file={corsoEscavatoriIdraulici} modifica={editabile} nome="corsoEscavatoriIdraulici"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoEscavatoriIdraulici", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoEscavatoriIdraulici')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
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