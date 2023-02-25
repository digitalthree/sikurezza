import React, {useState} from 'react';
import {CreazioneImpresa} from "../../factory/creazioneImpresa/CreazioneImpresa";
import {Breadcrumb} from "../../../../shared/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../store/impresaSlice";
import {CreationFactory} from "../../factory/CreationFactory";

export interface SezioneImpresaProps {

}

const SezioneImpresa: React.FC<SezioneImpresaProps> = ({}) => {

    const [objectToCreate, setObjectToCreate] = useState<string|undefined>(undefined);
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    return (
        <>
            <Breadcrumb breadcrumbsItems={["Home", impresaSelezionata?.anagrafica.denominazione as string]}
                        setObjectToCreate={setObjectToCreate}/>
            {!objectToCreate ?
                <div className="text-center">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-8 py-[5%]">
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => setObjectToCreate("Impresa")}
                        >
                            <span>Anagrafica e Doc.</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => setObjectToCreate("Maestranza")}
                        >
                            <span>Maestranze</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => setObjectToCreate("Macchina")}
                        >
                            <span>Macchine e Attrezzature</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => setObjectToCreate("Gru")}
                        >
                            <span>Gru</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => setObjectToCreate("Ponteggio")}
                        >
                            <span>Ponteggi</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => setObjectToCreate("Estintore")}
                        >
                            <span>Estintori</span>
                        </div>
                    </div>
                </div> :
                <CreationFactory objectToCreate={objectToCreate} setObjectToCreate={setObjectToCreate} primoAccesso={false}/>
            }
        </>

    )
}

export default SezioneImpresa