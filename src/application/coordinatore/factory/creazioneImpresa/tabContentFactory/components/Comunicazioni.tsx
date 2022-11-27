import React from 'react';
import {useForm} from "react-hook-form";
import {TfiSave} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {addImpresa, ImpreseDaCreareSelector, setImpresaDaCreare} from "../../../../../../store/impresaSlice";
import {impresaTemporanea} from "../../../../../../model/Impresa";
import {useFaunaQuery} from "../../../../../../faunadb/hooks/useFaunaQuery";
import {createImpresaInFauna} from "../../../../../../faunadb/api/impresaAPIs";
import {
    addImpresaSubOnCantiere, CantiereProxySelector,
    CantiereSelezionatoSelector,
    selezionaCantiere
} from "../../../../../../store/cantiereSlice";
import {updateCantiereInFauna} from "../../../../../../faunadb/api/cantiereAPIs";
import {Cantiere} from "../../../../../../model/Cantiere";

interface ComunicazioniProps {
    setObjectToCreate: (s:string|undefined) => void
}

export const Comunicazioni: React.FC<ComunicazioniProps> = ({setObjectToCreate}) => {

    const dispatch = useDispatch()
    const impresaDaCreare = useSelector(ImpreseDaCreareSelector)
    const cantiereProxy = useSelector(CantiereProxySelector)

    const {execQuery} = useFaunaQuery()

    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => {
        dispatch(addImpresa({
            ...impresaDaCreare,
            comunicazioni: data
        }))
        execQuery(createImpresaInFauna, {...impresaDaCreare, comunicazioni: data}).then(res => {
            let id = res.ref.value.id
            if(cantiereProxy) {
                execQuery(updateCantiereInFauna, {...cantiereProxy, impreseSubappaltatrici: [...cantiereProxy.impreseSubappaltatrici, id]})
                dispatch(addImpresaSubOnCantiere({idCantiere: cantiereProxy.faunaDocumentId as string, impresa: id}))
            }
        })
        dispatch(setImpresaDaCreare(impresaTemporanea))
        setObjectToCreate(undefined)
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-20 w-[50%] p-10 shadow-2xl">

                <div className="flex justify-between items-center">
                    <span className="font-bold">Direttore Tecnico di Cantiere: </span>
                    <input {...register("nomeDirettoreTecnico")}
                           className="rounded border border-gray-400 shadow p-1 w-[262px]"
                           defaultValue={impresaDaCreare.comunicazioni.nomeDirettoreTecnico}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Telefono: </span>
                    <input type="number" {...register("telefonoDirettoreTecnico")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.telefonoDirettoreTecnico}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Mail: </span>
                    <input type="email" {...register("mailDirettoreTecnico")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.mailDirettoreTecnico}
                    />
                </div>

                <hr className="mt-5 mb-5"/>

                <div className="flex justify-between items-center">
                    <span className="font-bold">RLS: </span>
                    <input {...register("nomeRls")}
                           className="rounded border border-gray-400 shadow p-1 w-[262px]"
                           defaultValue={impresaDaCreare.comunicazioni.nomeRls}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Telefono: </span>
                    <input type="number" {...register("telefonoRls")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.telefonoRls}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Mail: </span>
                    <input type="email" {...register("mailRls")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.mailRls}
                    />
                </div>

                <hr className="mt-5 mb-5"/>

                <div className="flex justify-between items-center">
                    <span className="font-bold">RSPP: </span>
                    <input {...register("nomeRspp")}
                           className="rounded border border-gray-400 shadow p-1 w-[262px]"
                           defaultValue={impresaDaCreare.comunicazioni.nomeRspp}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Telefono: </span>
                    <input type="number" {...register("telefonoRspp")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.telefonoRspp}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Mail: </span>
                    <input type="email" {...register("mailRspp")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.mailRspp}
                    />
                </div>

                <hr className="mt-5 mb-5"/>

                <div className="flex justify-between items-center">
                    <span className="font-bold">Responsabile d'ufficio per la documentazione: </span>
                    <input {...register("nomeResponsabileUfficioDocumentazione")}
                           className="rounded border border-gray-400 shadow p-1 w-[262px]"
                           defaultValue={impresaDaCreare.comunicazioni.nomeResponsabileUfficioDocumentazione}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Telefono: </span>
                    <input type="number" {...register("telefonoResponsabileUfficioDocumentazione")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.telefonoResponsabileUfficioDocumentazione}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Mail: </span>
                    <input type="email" {...register("mailResponsabileUfficioDocumentazione")}
                           className="rounded border border-gray-400 shadow p-1"
                           defaultValue={impresaDaCreare.comunicazioni.mailResponsabileUfficioDocumentazione}
                    />
                </div>

                <div className="flex mt-10">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button type="submit" className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold">
                        Crea Impresa
                    </button>

                </div>
            </form>
        </>
    )

}