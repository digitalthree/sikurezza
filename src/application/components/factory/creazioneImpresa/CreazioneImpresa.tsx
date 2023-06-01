import React, {useState} from 'react';
import {TabContentImpresaFactory} from "./tabContentFactory/TabContentImpresaFactory";
import {Breadcrumb} from "../../../../shared/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import {ImpresaSelezionataSelector} from "../../../../store/impresaSlice";

interface CreazioneImpresaProps {
    primoAccesso: boolean
}

export const CreazioneImpresa: React.FC<CreazioneImpresaProps> = ({primoAccesso}) => {

    const [tabActive, setTabActive] = useState("Anagrafica");
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)

    console.log(primoAccesso)

    return (
        <>
            {!impresaSelezionata && <Breadcrumb />}
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
                <TabContentImpresaFactory selectedTab={tabActive} setTabActive={setTabActive} primoAccesso={primoAccesso}/>
            </div>
        </>

    )

}