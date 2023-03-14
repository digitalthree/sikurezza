import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {Maestranza} from "../../../../../../../../model/Maestranza";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setEffettuatoIlInMaestranza, setFileInDocumentiMaestranza, setScadenzaIlInMaestranza
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
        }
    }, [])
    let corsoPrimoSoccorso = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoPrimoSoccorso')[0].file
    let corsoPrevIncendi = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoPrevIncendi')[0].file
    let corsoPreposto = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoPreposto')[0].file
    let corsoRLS = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoRLS')[0].file
    let corsoRSPP = maestranzaSelezionata?.documenti.filter(d => d.nome === 'corsoRSPP')[0].file
    const dispatch = useDispatch()


    return(
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-3">Corso Primo Soccorso: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrimoSoccorsoEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPrimoSoccorso', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrimoSoccorsoScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPrimoSoccorso', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrimoSoccorso')[0].scadenza}
                />
                {(corsoPrimoSoccorso || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoPrimoSoccorso')[0].file) ?
                    <VisualizzaEliminaFile file={corsoPrimoSoccorso as string} modifica={editabile} nome="corsoPrimoSoccorso"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPrimoSoccorso", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPrimoSoccorso',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Prev. Incendi: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrevIncendiEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPrevIncendi', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrevIncendiScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPrevIncendi', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPrevIncendi')[0].scadenza}
                />
                {(corsoPrevIncendi || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoPrevIncendi')[0].file) ?
                    <VisualizzaEliminaFile file={corsoPrevIncendi as string} modifica={editabile} nome="corsoPrevIncendi"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPrevIncendi", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPrevIncendi',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso Preposto: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoPrepostoEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoPreposto', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoPrepostoScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoPreposto', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoPreposto')[0].scadenza}
                />
                {(corsoPreposto || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoPreposto')[0].file) ?
                    <VisualizzaEliminaFile file={corsoPreposto as string} modifica={editabile} nome="corsoPreposto"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoPreposto", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoPreposto',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso RLS: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoRLSEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoRLS', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoRLSScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoRLS', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRLS')[0].scadenza}
                />
                {(corsoRLS || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoRLS')[0].file) ?
                    <VisualizzaEliminaFile file={corsoRLS as string} modifica={editabile} nome="corsoRLS"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoRLS", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'corsoRLS',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-3">Corso RSPP: </span>
                <div className="flex flex-col col-span-2">
                    <input type="date" {...register("corsoRSPPEffettuatoIl")}
                           className="rounded border border-gray-400 shadow p-1"
                           disabled={!editabile}
                           onChange={(e) => dispatch(setEffettuatoIlInMaestranza({nome: 'corsoRSPP', value: e.target.value}))}
                           defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].effettuatoIl}
                    />
                </div>
                <span className="font-bold col-span-1">scadenza: </span>
                <input type="date" {...register("corsoRSPPScadenza")}
                       className="rounded border border-gray-400 shadow p-1 col-span-2"
                       disabled={!editabile}
                       onChange={(e) => dispatch(setScadenzaIlInMaestranza({nome: 'corsoRSPP', value: e.target.value}))}
                       defaultValue={maestranza.documenti?.filter(d => d.nome === 'corsoRSPP')[0].scadenza}
                />
                {(corsoRSPP || maestranzaDaCreare.documenti.filter(d => d.nome === 'corsoRSPP')[0].file) ?
                    <VisualizzaEliminaFile file={corsoRSPP as string} modifica={editabile} nome="corsoRSPP"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({nome: "corsoRSPP", file: undefined}))}
                    />:
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
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