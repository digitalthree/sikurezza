import React, {useState} from 'react';
import {SelectWithSearch} from "../../../../shared/slectComponent/SelectWithSearch";
import {useSelector} from "react-redux";
import {CantieriSelector} from "../../../../store/cantiereSlice";
import {ImpreseSelector} from "../../../../store/impresaSlice";
import {MaestranzeSelector} from "../../../../store/maestranzaSlice";

interface SelectionAndSearchGridProps {
}

export const SelectionAndSearchGrid: React.FC<SelectionAndSearchGridProps> = ({}) => {

    const [selectedCantiere, setSelectedCantiere] = useState("");
    const [selectedImpresa, setSelectedImpresa] = useState("");
    const [selectedLuogo, setSelectedLuogo] = useState("");
    const [selectedMaestranza, setSelectedMaestranza] = useState("");

    const cantieri = useSelector(CantieriSelector)
    const nomiCantieri = cantieri.map(c => `${c.nome}-${c.indirizzo}-${c.civico}-${c.comune}`)

    const imprese = useSelector(ImpreseSelector)
    const nomiImprese = imprese.map(i => i.anagrafica.denominazione)

    const maestranze = useSelector(MaestranzeSelector)
    const nomiMaestranze = maestranze.map(m => `${m.anagrafica.nome} ${m.anagrafica.cognome}`)


    return (
        <div className="grid grid-cols-4 gap-24 mt-14">
            <SelectWithSearch tipo="Cantiere" selected={selectedCantiere} setSelected={setSelectedCantiere}
                              items={nomiCantieri} placeholder="Cantiere"/>
            <SelectWithSearch tipo="Impresa" selected={selectedImpresa} setSelected={setSelectedImpresa}
                              items={nomiImprese} placeholder="Impresa"/>
            <SelectWithSearch tipo="Luogo" selected={selectedLuogo} setSelected={setSelectedLuogo}
                              items={['Luogo1', 'Luogo2']} placeholder="Luogo"/>
            <SelectWithSearch tipo="Maestranza" selected={selectedMaestranza} setSelected={setSelectedMaestranza}
                              items={nomiMaestranze} placeholder="Maestranza"/>
        </div>
    )

}