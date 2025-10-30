import React, {useEffect} from 'react';
import {Estintore, estintoreDefault} from "../../../model/Estintore";
import {useDispatch, useSelector} from "react-redux";
import {
    addEstintore,
    EstintoreSelezionatoSelector,
    removeEstintore,
    setEstintoreSelezionato
} from "../../../store/estintoreSlice";
import {ImpresaSelezionataSelector} from "../../../store/impresaSlice";
import { useDynamoDBQuery } from '../../../dynamodb/hook/useDynamoDBQuery';
import { createEstintoreInDynamo, updateEstintoreInDynamo } from '../../../dynamodb/api/estintoreAPIs';

export interface CreazioneEstintoreProps{
    estintoreDaCreare: Estintore,
    setEstintoreDaCreare: (e: Estintore) => void,
    editabile: boolean,
    modifica: boolean,
    setModifica: (v: boolean) => void
}

const CreazioneEstintore: React.FC<CreazioneEstintoreProps> = (
    {
        estintoreDaCreare, setEstintoreDaCreare, editabile, modifica, setModifica
    }
) => {

    const {execQuery2} = useDynamoDBQuery()
    const dispatch = useDispatch()
    const estintoreSelezionato = useSelector(EstintoreSelezionatoSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    useEffect(() => {
        if(estintoreSelezionato){
            setEstintoreDaCreare(estintoreSelezionato)
        }
        else{
            setEstintoreDaCreare(estintoreDefault)
        }
    }, [estintoreSelezionato, editabile])

    return(
        <>
            <input type="checkbox" id="my-modal-4" className="modal-toggle"/>
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative">
                    <div className="flex justify-between items-center">
                        <span className="font-bold">Nome Estintore: </span>
                        <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               value={estintoreDaCreare.nome}
                               onChange={e => {
                                   setEstintoreDaCreare({
                                       ...estintoreDaCreare,
                                       nome: e.target.value
                                   })
                               }}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="font-bold">Attualmente in uso nel cantiere: </span>
                        <input className="rounded border border-gray-400 shadow p-1 w-[262px]"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               value={estintoreDaCreare.cantiere}
                               onChange={e => {
                                   setEstintoreDaCreare({
                                       ...estintoreDaCreare,
                                       cantiere: e.target.value
                                   })
                               }}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="font-bold">Matricola: </span>
                        <input type="number" className="rounded border border-gray-400 shadow p-1 w-[262px]"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               value={estintoreDaCreare.matricola}
                               onChange={e => {
                                   setEstintoreDaCreare({
                                       ...estintoreDaCreare,
                                       matricola: parseInt(e.target.value)
                                   })
                               }}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="font-bold">nr.: </span>
                        <input type="number" className="rounded border border-gray-400 shadow p-1 w-[262px]"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               value={estintoreDaCreare.numero}
                               onChange={e => {
                                   setEstintoreDaCreare({
                                       ...estintoreDaCreare,
                                       numero: parseInt(e.target.value)
                                   })
                               }}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="font-bold">Data di ultima revisione: </span>
                        <input type="date" className="rounded border border-gray-400 shadow p-1 w-[262px]"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               value={estintoreDaCreare.dataUltimaRevisione}
                               onChange={e => {
                                   setEstintoreDaCreare({
                                       ...estintoreDaCreare,
                                       dataUltimaRevisione: e.target.value
                                   })
                               }}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="font-bold">Scadenza: </span>
                        <input type="date" className="rounded border border-gray-400 shadow p-1 w-[262px]"
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               disabled={!editabile}
                               value={estintoreDaCreare.scadenza}
                               onChange={e => {
                                   setEstintoreDaCreare({
                                       ...estintoreDaCreare,
                                       scadenza: e.target.value
                                   })
                               }}
                        />
                    </div>
                    {editabile && !modifica &&
                        <div className="modal-action"
                             onClick={() => {
                                let id = crypto.randomUUID()
                                 execQuery2(createEstintoreInDynamo, {
                                     ...estintoreDaCreare,
                                     creatoDa: impresaSelezionata?.id,
                                     id: id
                                 }).then((res) => {
                                     dispatch(addEstintore({
                                         ...estintoreDaCreare,
                                         id: id,
                                         creatoDa: impresaSelezionata?.id as string
                                     }))
                                     setEstintoreDaCreare(estintoreDefault)
                                     dispatch(setEstintoreSelezionato(undefined))
                                 })
                             }}
                        >
                            <label htmlFor="my-modal-4" className="btn btn-warning">Crea Estintore</label>
                        </div>
                    }
                    {editabile && modifica &&
                        <div className="modal-action"
                             onClick={() => {
                                 execQuery2(updateEstintoreInDynamo, {
                                     ...estintoreDaCreare,
                                     creatoDa: impresaSelezionata?.id
                                 }).then(() => {
                                     dispatch(removeEstintore(estintoreSelezionato?.id as string))
                                     dispatch(addEstintore({
                                         ...estintoreDaCreare,
                                         creatoDa: impresaSelezionata?.id as string
                                     }))
                                     setEstintoreDaCreare(estintoreDefault)
                                     setModifica(false)
                                     dispatch(setEstintoreSelezionato(undefined))
                                 })
                             }}
                        >
                            <label htmlFor="my-modal-4" className="btn btn-warning">Modifica Estintore</label>
                        </div>
                    }

                </label>
            </label>
        </>
    )
}

export default CreazioneEstintore