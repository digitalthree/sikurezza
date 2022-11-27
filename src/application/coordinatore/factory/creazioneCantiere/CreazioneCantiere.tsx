import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useFaunaQuery} from "../../../../faunadb/hooks/useFaunaQuery";
import {createCantiereInFauna, getAllCantieriByCreatoDa} from "../../../../faunadb/api/cantiereAPIs";
import {Cantiere} from "../../../../model/Cantiere";
import {useAuth0} from "@auth0/auth0-react";
import {useDispatch, useSelector} from "react-redux";
import {addCantiere} from "../../../../store/cantiereSlice";
import {ImpreseSelector} from "../../../../store/impresaSlice";

interface CreazioneCantiereProps {
    setObjectToCreate: (s: string | undefined) => void
}

export const CreazioneCantiere: React.FC<CreazioneCantiereProps> = ({setObjectToCreate}) => {

    const dispatch = useDispatch()
    const imprese = useSelector(ImpreseSelector)

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {user} = useAuth0()
    const {execQuery} = useFaunaQuery()
    const onSubmit = (data: any) => {
        console.log(data)
        //TODO: associare all'impresa affidataria l'id del documento fauna e non il nome dell'impresa
        execQuery(createCantiereInFauna, {
            ...data,
            creatoDa: user?.email,
            impresaAffidataria: data.impresaAffidataria,
            impreseSubappaltatrici: []
        } as Cantiere).then(() => {
            dispatch(addCantiere({
                ...data,
                creatoDa: user?.email,
                impresaAffidataria: data.impresaAffidataria,
                impreseSubappaltatrici: []
            }))
            setObjectToCreate(undefined)
        });
    }


    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-20 w-[33%] p-10 shadow-2xl">

                <div className="flex justify-between items-center">
                    <span className="font-bold">Nome*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Nome" {...register("nome", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                        />
                        {errors.nome && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Indirizzo*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Indirizzo" {...register("indirizzo", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                        />
                        {errors.indirizzo && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>


                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Civico*: </span>
                    <div className="flex flex-col">
                        <input type="number" placeholder="Civico" {...register("civico", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                        />
                        {errors.civico && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">CAP*: </span>
                    <div className="flex flex-col">
                        <input type="number" placeholder="CAP" {...register("cap", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                        />
                        {errors.cap && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Comune*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Comune" {...register("comune", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                        />
                        {errors.comune && <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Responsabile Lavori*: </span>
                    <div className="flex flex-col">
                        <input placeholder="Resp. Lavori" {...register("responsabileLavori", {required: true})}
                               className="rounded border border-gray-400 shadow p-1"
                        />
                        {errors.responsabileLavori &&
                            <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Impresa Affidataria*: </span>
                    <div className="flex flex-col">
                        <select placeholder="Impresa Affidataria" {...register("impresaAffidataria", {required: true})}
                                className="rounded border border-gray-400 shadow p-1"
                                defaultValue={imprese[0].faunaDocumentId}
                                defaultChecked={true}
                        >
                            {imprese.map(i => {
                                return <option value={i.faunaDocumentId}>{i.anagrafica.denominazione}</option>
                            })}
                        </select>
                        {errors.impresaAffidataria &&
                            <span className="font-bold text-red-600">Campo obbligatorio</span>}
                    </div>
                </div>


                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button type="submit"
                            className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                        Crea Cantiere
                    </button>

                </div>
            </form>
        </div>
    )
}