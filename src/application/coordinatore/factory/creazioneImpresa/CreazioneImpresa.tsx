import React, {useState} from 'react';
import {IoArrowBackCircle} from "react-icons/io5";
import {TabContentImpresaFactory} from "./tabContentFactory/TabContentImpresaFactory";

interface CreazioneImpresaProps {
    setObjectToCreate: (s:string|undefined) => void
}

export const CreazioneImpresa: React.FC<CreazioneImpresaProps> = ({setObjectToCreate}) => {

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
                {/*<a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Checklist" ? 'tab-active' : ''}`}
                   onClick={() => setTabActive("Checklist")}
                >
                    Checklist
                </a>*/}
            </div>
            <TabContentImpresaFactory selectedTab={tabActive} setTabActive={setTabActive} setObjectToCreate={setObjectToCreate}/>
        </div>
    )

}