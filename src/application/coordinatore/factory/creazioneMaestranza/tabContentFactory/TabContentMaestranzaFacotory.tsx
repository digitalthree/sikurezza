import React from 'react';
import {AnagraficaImpresa} from "../../creazioneImpresa/tabContentFactory/components/AnagraficaImpresa";
import {DocumentiImpresa} from "../../creazioneImpresa/tabContentFactory/components/DocumentiImpresa";
import {ComunicazioniImpresa} from "../../creazioneImpresa/tabContentFactory/components/ComunicazioniImpresa";
import AnagraficaMaestranza from "./components/AnagraficaMaestranza";
import DocumentiMaestranza from "./components/documentiMaestranza/DocumentiMaestranza";

export interface TabContentMaestranzaFactoryProps{
    selectedTab: string
    setTabActive: (s:string) => void
    setObjectToCreate: (s:string|undefined) => void
}

const TabContentMaestranzaFactory: React.FC<TabContentMaestranzaFactoryProps> = (
    {
        selectedTab, setTabActive, setObjectToCreate
    }
) => {
    switch (selectedTab) {
        case "Anagrafica":
            return <AnagraficaMaestranza setTabActive={setTabActive}/>
        case "Documenti":
            return <DocumentiMaestranza setTabActive={setTabActive}/>
        case "Comunicazioni":
            return <ComunicazioniImpresa setObjectToCreate={setObjectToCreate}/>
        /*case "Checklist":
            return <>Tab Checklist</>*/
        default: return <>Tab Anagrafica</>
    }
}

export default TabContentMaestranzaFactory