import React from 'react';
import {CreazioneImpresa} from "./creazioneImpresa/CreazioneImpresa";
import {CreazioneCantiere} from "./creazioneCantiere/CreazioneCantiere";
import CreazioneMaestranza from "./creazioneMaestranza/CreazioneMaestranza";
import MaestranzeTab from "../../mirkoComponents/MaestranzeTab";
import MacchineAttrezzatureTab from "../../mirkoComponents/MacchineAttrezzatureTab";
import PonteggioTab from "../../mirkoComponents/PonteggioTab";
import GruTab from "../../mirkoComponents/GruTab";
import EstintoreTab from "../../mirkoComponents/EstintoreTab";

interface CreationFactoryProps {
    objectToCreate: string | undefined
    setObjectToCreate: (s:string|undefined) => void,
    primoAccesso: boolean
}

export const CreationFactory: React.FC<CreationFactoryProps> = (
    {
        objectToCreate, setObjectToCreate, primoAccesso
    }
) => {
    switch (objectToCreate) {
        case "Impresa":
            return <CreazioneImpresa setObjectToCreate={setObjectToCreate} primoAccesso={primoAccesso}/>
        case "Maestranza":
            //return <CreazioneMaestranza setObjectToCreate={setObjectToCreate}/>
            return <MaestranzeTab/>
        case "Macchina":
            return <MacchineAttrezzatureTab/>
        case "Gru":
            return <GruTab/>
        case "Ponteggio":
            return <PonteggioTab/>
        case "Estintore":
            return <EstintoreTab/>
        case "Cantiere":
            return <CreazioneCantiere setObjectToCreate={setObjectToCreate}/>
        default: return <></>
    }
}