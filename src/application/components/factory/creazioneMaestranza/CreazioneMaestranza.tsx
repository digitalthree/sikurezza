import React, {useState} from 'react';
import {TabContentImpresaFactory} from "../creazioneImpresa/tabContentFactory/TabContentImpresaFactory";
import TabContentMaestranzaFactory from "./tabContentFactory/TabContentMaestranzaFacotory";

export interface CreazioneMaestranzaProps{
    setObjectToCreate: (s:string|undefined) => void
}

const CreazioneMaestranza: React.FC<CreazioneMaestranzaProps> = (
    {
        setObjectToCreate
    }
) => {

    const [tabActive, setTabActive] = useState("Anagrafica");

    return(
        <div className="w-full flex flex-col items-center">
            <div className="tabs">
                <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Anagrafica" ? 'tab-active' : ''}`}
                   onClick={() => setTabActive("Anagrafica")}
                >
                    Anagrafica
                </a>
                <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Documenti" ? 'tab-active' : ''}`}
                   onClick={() => setTabActive("Documenti")}
                >
                    Documenti
                </a>
                <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Comunicazioni" ? 'tab-active' : ''}`}
                   onClick={() => setTabActive("Comunicazioni")}
                >
                    Comunicazioni
                </a>
            </div>
            <TabContentMaestranzaFactory selectedTab={tabActive} setTabActive={setTabActive} setObjectToCreate={setObjectToCreate}/>
        </div>
    )
}

export default CreazioneMaestranza
