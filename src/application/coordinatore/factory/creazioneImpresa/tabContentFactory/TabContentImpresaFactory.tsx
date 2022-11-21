import React from 'react';
import {Anagrafica} from "./components/Anagrafica";
import {Comunicazioni} from "./components/Comunicazioni";
import {Documenti} from "./components/Documenti";

interface TabContentImpresaFactoryProps {
    selectedTab: string
    setTabActive: (s:string) => void
    setObjectToCreate: (s:string|undefined) => void
}

export const TabContentImpresaFactory: React.FC<TabContentImpresaFactoryProps> = (
    {
        selectedTab, setTabActive, setObjectToCreate
    }
) => {
    switch (selectedTab) {
        case "Anagrafica":
            return <Anagrafica setTabActive={setTabActive}/>
        case "Documenti":
            return <Documenti setTabActive={setTabActive}/>
        case "Comunicazioni":
            return <Comunicazioni setObjectToCreate={setObjectToCreate}/>
        /*case "Checklist":
            return <>Tab Checklist</>*/
        default: return <>Tab Anagrafica</>
    }

}