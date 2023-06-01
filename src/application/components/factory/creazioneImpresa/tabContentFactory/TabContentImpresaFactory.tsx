import React, {useState} from 'react';
import {AnagraficaImpresa} from "./components/AnagraficaImpresa";
import {ComunicazioniImpresa} from "./components/ComunicazioniImpresa";
import {DocumentiImpresa} from "./components/DocumentiImpresa";
import {useLocation} from "react-router-dom";

interface TabContentImpresaFactoryProps {
    selectedTab: string
    setTabActive: (s:string) => void
    primoAccesso: boolean
}

export const TabContentImpresaFactory: React.FC<TabContentImpresaFactoryProps> = (
    {
        selectedTab, setTabActive, primoAccesso
    }
) => {

    switch (selectedTab) {
        case "Anagrafica":
            return <AnagraficaImpresa setTabActive={setTabActive} primoAccesso={primoAccesso}/>
        case "Documenti":
            return <DocumentiImpresa setTabActive={setTabActive} editabile={true}/>
        case "Comunicazioni":
            return <ComunicazioniImpresa />
        default: return <>Tab Anagrafica</>
    }

}