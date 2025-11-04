import React, {useState} from 'react';
import TabContentMaestranzaFactory from "./tabContentFactory/TabContentMaestranzaFacotory";
import {useLocation} from "react-router-dom";

export interface CreazioneMaestranzaProps {
    editabile?: boolean
    modifica?: boolean
}

const CreazioneMaestranza: React.FC<CreazioneMaestranzaProps> = ({editabile, modifica}) => {

    const [tabActive, setTabActive] = useState("Anagrafica");
    const location = useLocation()


    return (
        <div className="w-full flex flex-col items-center">
            <div className="tabs mb-10">
                <a className={`tab tab-bordered xl:p-[50px] p-8 xl:text-xl ${tabActive === "Anagrafica" ? 'tab-active' : ''}`}
                   onClick={() => {
                       setTabActive("Anagrafica")
                   }}
                >
                    Anagrafica
                </a>
                <a className={`tab tab-bordered xl:p-[50px] p-8 xl:text-xl ${tabActive === "Documenti" ? 'tab-active' : ''}`}
                   onClick={() => {
                       setTabActive("Documenti")
                   }}
                >
                    Documenti
                </a>
                <a className={`tab tab-bordered xl:p-[50px] p-8 xl:text-xl ${tabActive === "Comunicazioni" ? 'tab-active' : ''}`}
                   onClick={() => {
                       setTabActive("Comunicazioni")
                   }}
                >
                    Comunicazioni
                </a>
            </div>
            <TabContentMaestranzaFactory selectedTab={tabActive} setTabActive={setTabActive}
                                         editabile={editabile ? editabile : location.state.editabile as boolean}
                                         modifica={modifica ? modifica : location.state.modifica as boolean}/>
        </div>
    )
}

export default CreazioneMaestranza
