import React from 'react';
import AnagraficaMaestranza from "./components/AnagraficaMaestranza";
import DocumentiMaestranza from "./components/documentiMaestranza/DocumentiMaestranza";
import ComunicazioniMaestranza from "./components/ComunicazioniMaestranza";
import {useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../../store/impresaSlice";
import {Impresa} from "../../../../../model/Impresa";

export interface TabContentMaestranzaFactoryProps{
    selectedTab: string
    setTabActive: (s:string) => void
    editabile: boolean
    modifica: boolean
    setmodificaEffettuata?: (v:boolean) => void
}

const TabContentMaestranzaFactory: React.FC<TabContentMaestranzaFactoryProps> = (
    {
        selectedTab, setTabActive, editabile, modifica, setmodificaEffettuata
    }
) => {


    switch (selectedTab) {
        case "Anagrafica":
            return <AnagraficaMaestranza setTabActive={setTabActive} editabile={editabile} setmodificaEffettuata={setmodificaEffettuata}/>
        case "Documenti":
            return <DocumentiMaestranza setTabActive={setTabActive} editabile={editabile} modifica={modifica}/>
        case "Comunicazioni":
            return <ComunicazioniMaestranza  editabile={editabile} modifica={modifica} setmodificaEffettuata={setmodificaEffettuata}/>
        default: return <AnagraficaMaestranza setTabActive={setTabActive} editabile={editabile} setmodificaEffettuata={setmodificaEffettuata}/>
    }
}

export default TabContentMaestranzaFactory