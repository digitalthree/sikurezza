import React, {useState} from 'react';
import {CreazioneImpresa} from "../../factory/creazioneImpresa/CreazioneImpresa";

export interface SezioneImpresaProps {

}

const SezioneImpresa: React.FC<SezioneImpresaProps> = ({}) => {

    const [objectToCreate, setObjectToCreate] = useState<string|undefined>(undefined);

    return (
        <>
            {!objectToCreate ?
                <div className="text-center">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-8 py-[5%]">
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90"
                             onClick={() => setObjectToCreate("Impresa")}
                        >
                            <span>Anagrafica e Doc.</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90">
                            <span>Maestranze</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90">
                            <span>Macchine e Attrezzature</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90">
                            <span>Gru</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90">
                            <span>Ponteggi</span>
                        </div>
                        <div className="w-[90%] lg:h-[220px] h-[180px] flex justify-center items-center bg-gradient-to-br from-amber-200 to-orange-400 text-white lg:text-3xl text-2xl rounded-xl shadow-xl hover:underline hover:cursor-pointer hover:opacity-90">
                            <span>Elettricista</span>
                        </div>
                    </div>
                </div> :
                <CreazioneImpresa setObjectToCreate={setObjectToCreate}/>
            }
        </>

    )
}

export default SezioneImpresa