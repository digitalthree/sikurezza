import React from 'react';
import {CreazioneImpresa} from "./creazioneImpresa/CreazioneImpresa";
import {CreazioneCantiere} from "./creazioneCantiere/CreazioneCantiere";
import CreazioneMaestranza from "./creazioneMaestranza/CreazioneMaestranza";

interface CreationFactoryProps {
    objectToCreate: string | undefined
    setObjectToCreate: (s:string|undefined) => void,
}

export const CreationFactory: React.FC<CreationFactoryProps> = (
    {
        objectToCreate, setObjectToCreate,
    }
) => {
    switch (objectToCreate) {
        case "Impresa":
            return <CreazioneImpresa setObjectToCreate={setObjectToCreate}/>
        case "Maestranza":
            return <CreazioneMaestranza setObjectToCreate={setObjectToCreate}/>
        case "Macchina":
            return <></>
        case "Cantiere":
            return <CreazioneCantiere setObjectToCreate={setObjectToCreate}/>
        default: return <></>
    }
}