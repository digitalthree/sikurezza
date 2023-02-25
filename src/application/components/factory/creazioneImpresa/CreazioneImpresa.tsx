import React, {useState} from 'react';
import {IoArrowBackCircle} from "react-icons/io5";
import {TabContentImpresaFactory} from "./tabContentFactory/TabContentImpresaFactory";
import {Breadcrumb} from "../../../../shared/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../store/impresaSlice";

interface CreazioneImpresaProps {
    setObjectToCreate: (s: string | undefined) => void,
    primoAccesso: boolean
}

export const CreazioneImpresa: React.FC<CreazioneImpresaProps> = ({setObjectToCreate, primoAccesso}) => {

    const [tabActive, setTabActive] = useState("Anagrafica");
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    return (
        <>
            {!impresaSelezionata && <Breadcrumb breadcrumbsItems={["Home", 'Creazione Impresa']}
                                                setObjectToCreate={setObjectToCreate}/>}
            <div className="w-full flex flex-col items-center">
                <div className="tabs">
                    <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Anagrafica" ? 'tab-active' : ''}`}
                       onClick={() => setTabActive("Anagrafica")}
                    >
                        Anagrafica
                    </a>
                    <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Documenti" ? 'tab-active' : ''}`}
                       onClick={() => setTabActive("Documenti")}
                    >
                        Documenti
                    </a>
                    <a className={`tab tab-bordered p-[50px] text-xl ${tabActive === "Comunicazioni" ? 'tab-active' : ''}`}
                       onClick={() => setTabActive("Comunicazioni")}
                    >
                        Comunicazioni
                    </a>
                </div>
                <TabContentImpresaFactory selectedTab={tabActive} setTabActive={setTabActive}
                                          setObjectToCreate={setObjectToCreate} primoAccesso={primoAccesso}/>
            </div>
        </>

    )

}