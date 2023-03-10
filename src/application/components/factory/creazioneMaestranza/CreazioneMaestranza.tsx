import React, {useState} from 'react';
import TabContentMaestranzaFactory from "./tabContentFactory/TabContentMaestranzaFacotory";
import {useLocation} from "react-router-dom";

export interface CreazioneMaestranzaProps{
    setObjectToCreate: (s:string|undefined) => void,
}

const CreazioneMaestranza: React.FC<CreazioneMaestranzaProps> = (
    {
        setObjectToCreate
    }
) => {

    const [tabActive, setTabActive] = useState("Anagrafica");
    const location = useLocation()


    return(
        <div className="w-full flex flex-col items-center">
            <div className="tabs">
                <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Anagrafica" ? 'tab-active' : ''}`}
                   onClick={() => {
                       if(!location.state.editabile){
                           setTabActive("Anagrafica")
                       }
                   }}
                >
                    Anagrafica
                </a>
                <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Documenti" ? 'tab-active' : ''}`}
                   onClick={() => {
                       if(!location.state.editabile){
                           setTabActive("Documenti")
                       }
                   }}
                >
                    Documenti
                </a>
                <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Comunicazioni" ? 'tab-active' : ''}`}
                   onClick={() => {
                       if(!location.state.editabile){
                           setTabActive("Comunicazioni")
                       }
                   }}
                >
                    Comunicazioni
                </a>
            </div>
            <TabContentMaestranzaFactory selectedTab={tabActive} setTabActive={setTabActive} setObjectToCreate={setObjectToCreate} editabile={location.state.editabile as boolean} modifica={location.state.modifica as boolean}/>
        </div>
    )
}

export default CreazioneMaestranza
