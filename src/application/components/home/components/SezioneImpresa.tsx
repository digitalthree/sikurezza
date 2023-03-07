import React, {useState} from 'react';
import {CreazioneImpresa} from "../../factory/creazioneImpresa/CreazioneImpresa";
import {Breadcrumb} from "../../../../shared/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../store/impresaSlice";
import {Outlet, useNavigate} from "react-router-dom";
import {Impresa} from "../../../../model/Impresa";

export interface SezioneImpresaProps {

}

const SezioneImpresa: React.FC<SezioneImpresaProps> = ({}) => {

    const [objectToCreate, setObjectToCreate] = useState<string|undefined>(undefined);
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const navigate = useNavigate()
    const [breadcrumbsItems, setBreadcrumbsItems] = useState<(string|Impresa)[]>(["Home", impresaSelezionata as Impresa])

    return (
        <>
            <Breadcrumb breadcrumbsItems={breadcrumbsItems}
                        setBreadcrumbsItems={setBreadcrumbsItems}
                        setObjectToCreate={setObjectToCreate}/>
            {!objectToCreate ?
                <div className="text-center">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-8 py-[5%]">
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => {
                                 setObjectToCreate("Impresa")
                                 setBreadcrumbsItems([...breadcrumbsItems, 'Anagrafica'])
                                 navigate('anagrafica')
                             }}
                        >
                            <span>Anagrafica e Doc.</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => {
                                 setObjectToCreate("Maestranza")
                                 setBreadcrumbsItems([...breadcrumbsItems, 'Maestranze'])
                                 navigate('maestranze')
                             }}
                        >
                            <span>Maestranze</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => {
                                 setObjectToCreate("Macchina")
                                 setBreadcrumbsItems([...breadcrumbsItems, 'Macchine e Attrezzature'])
                                 navigate('macchineEAttrezzature')
                             }}
                        >
                            <span>Macchine e Attrezzature</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => {
                                 setObjectToCreate("Gru")
                                 setBreadcrumbsItems([...breadcrumbsItems, 'Gru'])
                                 navigate('gru')
                             }}
                        >
                            <span>Gru</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => {
                                 setObjectToCreate("Ponteggio")
                                 setBreadcrumbsItems([...breadcrumbsItems, 'Ponteggi'])
                                 navigate('ponteggi')
                             }}
                        >
                            <span>Ponteggi</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => {
                                 setObjectToCreate('Estintore')
                                 setBreadcrumbsItems([...breadcrumbsItems, 'Estintori'])
                                 navigate(`estintori`)
                             }}
                        >
                            <span>Estintori</span>
                        </div>
                    </div>
                </div> :
                <Outlet/>
            }
        </>

    )
}

export default SezioneImpresa