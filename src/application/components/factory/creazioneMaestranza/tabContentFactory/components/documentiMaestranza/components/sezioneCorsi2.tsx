import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setEffettuatoIlInMaestranza, setFileInDocumentiMaestranza, setRichiedibileInMaestranza, setScadenzaIlInMaestranza
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

export interface SezioneCorsi1Props{
    register: Function,
    errors: FieldErrors,
    editabile: boolean,
    modifica: boolean,
}

const SezioneCorsi2: React.FC<SezioneCorsi1Props> = (
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
    let corsoPrimoSoccorso = maestranza?.documenti.filter(d => d.nome === 'corsoPrimoSoccorso')[0].file
    let corsoPrevIncendi = maestranza?.documenti.filter(d => d.nome === 'corsoPrevIncendi')[0].file
    let corsoPreposto = maestranza?.documenti.filter(d => d.nome === 'corsoPreposto')[0].file
    let corsoRLS = maestranza?.documenti.filter(d => d.nome === 'corsoRLS')[0].file
    let corsoRSPP = maestranza?.documenti.filter(d => d.nome === 'corsoRSPP')[0].file
    const dispatch = useDispatch()


    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-2">Corso Primo Soccorso: </span>
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
                               nome: 'corsoPrimoSoccorso',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrimoSoccorsoEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPrimoSoccorso', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrimoSoccorsoScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPrimoSoccorso', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].scadenza}
                />
                {corsoPrimoSoccorso ?
                    <VisualizzaEliminaFile file={corsoPrimoSoccorso} modifica={editabile} nome="corsoPrimoSoccorso"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPrimoSoccorso", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPrimoSoccorso',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso Prev. Incendi: </span>
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
                               nome: 'corsoPrevIncendi',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrevIncendiEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPrevIncendi', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrevIncendiScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPrevIncendi', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].scadenza}
                />
                {corsoPrevIncendi ?
                    <VisualizzaEliminaFile file={corsoPrevIncendi} modifica={editabile} nome="corsoPrevIncendi"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPrevIncendi", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPrevIncendi',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso Preposto: </span>
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
                               nome: 'corsoPreposto',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrepostoEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPreposto', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrepostoScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPreposto', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].scadenza}
                />
                {corsoPreposto ?
                    <VisualizzaEliminaFile file={corsoPreposto} modifica={editabile} nome="corsoPreposto"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPreposto", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPreposto',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso RLS: </span>
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
                               nome: 'corsoRLS',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoRLSEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoRLS', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoRLSScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoRLS', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].scadenza}
                />
                {corsoRLS ?
                    <VisualizzaEliminaFile file={corsoRLS} modifica={editabile} nome="corsoRLS"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoRLS", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoRLS',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Corso RSPP: </span>
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
                               nome: 'corsoRSPP',
                               value: !e.target.checked
                           }))}
                           defaultChecked={!maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].richiedibile}
                    />
                </div>
                <span className="font-bold col-span-1">svolto il: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoRSPPEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           onKeyDown={(e) => {
                               if(e.key === "Enter"){
                                   e.preventDefault()
                               }
                           }}
                           disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].richiedibile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoRSPP', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoRSPPScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       onKeyDown={(e) => {
                           if(e.key === "Enter"){
                               e.preventDefault()
                           }
                       }}
                       disabled={!editabile || !maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].richiedibile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoRSPP', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].scadenza}
                />
                {corsoRSPP ?
                    <VisualizzaEliminaFile file={corsoRSPP} modifica={editabile} nome="corsoRSPP"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoRSPP", file: undefined}))}
                    />:
                    <InputFile editabile={editabile && maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].richiedibile as boolean} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoRSPP',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneCorsi2