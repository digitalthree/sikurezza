import React, {useEffect, useState} from "react";
import {Breadcrumb} from "../../../../shared/breadcrumb/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {
    addBreadcrumbItem, ImpresaSelezionataSelector,
    ObjectToCreateSelector, resetBreadcrumbItems,
    setObjectToCreate
} from "../../../../store/impresaSlice";
import {Outlet, useNavigate} from "react-router-dom";
import {TiExportOutline} from "react-icons/ti";
import {exportToJsonFileThis} from "../../../../utils/ImportExportFunctions";
import {addMacchinaEAttrezzatura, MacchinaEAttrezzaturaSelector} from "../../../../store/macchinaEAttrezzaturaSlice";
import {getAllMacchineEAttrezzatureByCreatoDa} from "../../../../faunadb/api/macchinaEAttrezzaturaAPIs";
import {MacchinaEAttrezzatura} from "../../../../model/MacchineEAttrezzature";
import {useFaunaQuery} from "../../../../faunadb/hooks/useFaunaQuery";
import {Impresa} from "../../../../model/Impresa";

export interface SezioneImpresaProps {
}

const SezioneImpresa: React.FC<SezioneImpresaProps> = () => {
    const objectToCreate = useSelector(ObjectToCreateSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const [macchineEAttrezzature, setMacchineEAttrezzature] = useState<MacchinaEAttrezzatura[]>([])
    const {execQuery} = useFaunaQuery()

    useEffect(() => {
        execQuery(getAllMacchineEAttrezzatureByCreatoDa, impresaSelezionata?.faunaDocumentId).then((res) => {
            res.forEach((m: { id: string; macchinaEAttrezzatura: MacchinaEAttrezzatura }) => {
                setMacchineEAttrezzature([...macchineEAttrezzature, m.macchinaEAttrezzatura])
            });
        });
    }, [])

    useEffect(() => {
        if(
            !window.location.href.includes('anagrafica') &&
            !window.location.href.includes('maestranze') &&
            !window.location.href.includes('maestranza') &&
            !window.location.href.includes('macchineEAttrezzature')&&
            !window.location.href.includes('gru')&&
            !window.location.href.includes('ponteggi')&&
            !window.location.href.includes('cantieri')&&
            !window.location.href.includes('cantiere')&&
            !window.location.href.includes('estintori')
        ){
            dispatch(setObjectToCreate(undefined))
            dispatch(resetBreadcrumbItems())
            if(impresaSelezionata){
                dispatch(addBreadcrumbItem(impresaSelezionata))
            }
        }
        if(window.location.href.includes('cantieri')){
            dispatch(setObjectToCreate("Cantieri"))
        }
        if(window.location.href.includes('maestranze')){
            dispatch(setObjectToCreate("Maestranze"))
        }
    }, [window.location.href])

    return (
        <>
            <Breadcrumb/>
            {!objectToCreate ? (
                <div className="text-center">
                    <div
                        className="grid sm:grid-cols-3 grid-cols-1 place-items-center gap-4 pt-6 text-white lg:text-3xl text-2xl">
                        <div
                            className="bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80 "
                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage:
                                    ' url("/img/loghi_cruscotto/Anagrafica.png") ',
                            }}
                            onClick={() => {
                                dispatch(setObjectToCreate("Impresa"));
                                dispatch(addBreadcrumbItem("Anagrafica"));
                                navigate("anagrafica");
                            }}
                        >
                            <span>Anagrafica e Doc.</span>
                        </div>
                        <div
                            className="bg-contain md:bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center  rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage:
                                    ' url("/img/loghi_cruscotto/Maestranze.png") ',
                            }}
                            onClick={() => {
                                dispatch(setObjectToCreate("Maestranza"));
                                dispatch(addBreadcrumbItem("Maestranze"));
                                navigate("maestranze");
                            }}
                        >
                            <span>Maestranze</span>
                        </div>
                        <div
                            className="bg-contain md:bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage:
                                    ' url("/img/loghi_cruscotto/Macchine.png") ',
                            }}
                            onClick={() => {
                                dispatch(setObjectToCreate("Macchina"));
                                dispatch(addBreadcrumbItem("Macchine e Attrezzature"));
                                navigate("macchineEAttrezzature");
                            }}
                        >
                            <span>Macchine e Attrezzature</span>
                        </div>
                        <div
                            className="sm:col-span-3 col-span-1 bg-contain md:bg-auto py-12 bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
                            onClick={() => {
                                dispatch(setObjectToCreate("Cantieri"));
                                dispatch(addBreadcrumbItem("Cantieri"));
                                navigate("cantieri");
                            }}

                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage:
                                    ' url("/img/loghi_cruscotto/Cantieri.png") ',
                            }}
                        >
                            Cantieri
                        </div>
                        <div
                            className=" bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage:
                                    ' url("/img/loghi_cruscotto/Gru.png") ',
                            }}
                            onClick={() => {
                                dispatch(setObjectToCreate("Gru"));
                                dispatch(addBreadcrumbItem("Gru"));
                                navigate("gru");
                            }}
                        >
                            <span>Gru</span>
                        </div>
                        <div
                            className="bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center  rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage: ' url("/img/loghi_cruscotto/Ponteggio.png") ',
                            }}
                            onClick={() => {
                                dispatch(setObjectToCreate("Ponteggio"));
                                dispatch(addBreadcrumbItem("Ponteggi"));
                                navigate("ponteggi");
                            }}
                        >
                            <span>Ponteggi</span>
                        </div>
                        <div
                            className="bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage: ' url("/img/loghi_cruscotto/Estintori.png") ',
                            }}
                            onClick={() => {
                                dispatch(setObjectToCreate("Estintore"));
                                dispatch(addBreadcrumbItem("Estintori"));
                                navigate(`estintori`);
                            }}
                        >
                            <span>Estintori</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mt-7">
                        <button className="btn btn-warning flex flex-row items-center hover:cursor-pointer hover:opacity-70" onClick={() => {
                            exportToJsonFileThis({
                                impresa: {...impresaSelezionata, tipo: "Subappaltatrice"} as Impresa,
                                macchineEAttrezzature: macchineEAttrezzature
                            }, `${impresaSelezionata?.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}.json`)
                        }}>
                            <TiExportOutline size={25} className="mr-2"/>
                            <span className="mt-1 font-light">EXPORT IMPRESA</span>
                        </button>
                    </div>
                </div>
            ) : (
                <Outlet/>
            )}
        </>
    );
};

export default SezioneImpresa;
