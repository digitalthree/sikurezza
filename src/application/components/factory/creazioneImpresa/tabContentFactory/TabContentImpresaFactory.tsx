import React from 'react';
import {AnagraficaImpresa} from "./components/AnagraficaImpresa";
import {ComunicazioniImpresa} from "./components/ComunicazioniImpresa";
import {DocumentiImpresa} from "./components/DocumentiImpresa";

interface TabContentImpresaFactoryProps {
    selectedTab: string
    setTabActive: (s:string) => void
    setObjectToCreate: (s:string|undefined) => void,
    primoAccesso: boolean
}

export const TabContentImpresaFactory: React.FC<TabContentImpresaFactoryProps> = (
    {
        selectedTab, setTabActive, setObjectToCreate, primoAccesso
    }
) => {
    switch (selectedTab) {
        case "Anagrafica":
            return <AnagraficaImpresa setTabActive={setTabActive} primoAccesso={primoAccesso}/>
        case "Documenti":
            return <DocumentiImpresa setTabActive={setTabActive}/>
        case "Comunicazioni":
            return <ComunicazioniImpresa setObjectToCreate={setObjectToCreate}/>
        /*case "Checklist":
            return <>Tab Checklist</>*/
        default: return <>Tab Anagrafica</>
    }

}