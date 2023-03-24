import React, {useEffect} from "react";
import {Breadcrumb} from "../../../../shared/breadcrumb/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {
    addBreadcrumbItem, ImpresaSelezionataSelector,
    ObjectToCreateSelector, resetBreadcrumbItems,
    setObjectToCreate
} from "../../../../store/impresaSlice";
import {Outlet, useNavigate} from "react-router-dom";

export interface SezioneImpresaProps {
}

const SezioneImpresa: React.FC<SezioneImpresaProps> = () => {
    const objectToCreate = useSelector(ObjectToCreateSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    useEffect(() => {
        if(
            !window.location.href.includes('anagrafica') &&
            !window.location.href.includes('maestranze') &&
            !window.location.href.includes('macchineEAttrezzature')&&
            !window.location.href.includes('gru')&&
            !window.location.href.includes('ponteggi')&&
            !window.location.href.includes('cantieri')&&
            !window.location.href.includes('estintori')
        ){
            dispatch(setObjectToCreate(undefined))
            dispatch(resetBreadcrumbItems())
            if(impresaSelezionata){
                dispatch(addBreadcrumbItem(impresaSelezionata))
            }
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
                                    ' url("../img/loghi_cruscotto/Anagrafica.png") ',
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
                                    ' url("../img/loghi_cruscotto/Maestranze.png") ',
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
                                    ' url("../img/loghi_cruscotto/Macchine.png") ',
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
                                    ' url("../img/loghi_cruscotto/Cantieri.png") ',
                            }}
                        >
                            Cantieri
                        </div>
                        <div
                            className=" bg-auto bg-center bg-no-repeat w-full lg:h-[200px] h-[160px] flex justify-center items-center rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-80"
                            style={{
                                backgroundColor: "#FFC650",
                                backgroundImage:
                                    ' url("../img/loghi_cruscotto/Gru.png") ',
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
                                backgroundImage: ' url("../img/loghi_cruscotto/Ponteggio.png") ',
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
                                backgroundImage: ' url("../img/loghi_cruscotto/Estintori.png") ',
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
                </div>
            ) : (
                <Outlet/>
            )}
        </>
    );
};

export default SezioneImpresa;
