import React from 'react';
import AnagraficaMaestranza from "./components/AnagraficaMaestranza";
import DocumentiMaestranza from "./components/documentiMaestranza/DocumentiMaestranza";
import ComunicazioniMaestranza from "./components/ComunicazioniMaestranza";

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
            return <ComunicazioniMaestranza setObjectToCreate={setObjectToCreate}/>
        /*case "Checklist":
            return <>Tab Checklist</>*/
        default: return <>Tab Anagrafica</>
    }
}

export default TabContentMaestranzaFactory