import React, {useState} from 'react';
import {SelectWithSearch} from "../../../../../shared/slectComponent/SelectWithSearch";
import {useSelector} from "react-redux";
import {CantieriSelector} from "../../../../../store/cantiereSlice";

interface SelectionAndSearchGridProps {
}

export const SelectionAndSearchGrid: React.FC<SelectionAndSearchGridProps> = ({}) => {

    const [selectedCantiere, setSelectedCantiere] = useState("");
    const [selectedImpresa, setSelectedImpresa] = useState("");
    const [selectedLuogo, setSelectedLuogo] = useState("");
    const [selectedMaestranza, setSelectedMaestranza] = useState("");

    const cantieri = useSelector(CantieriSelector)
    const nomiCantieri = cantieri.map(c => `${c.nome}-${c.indirizzo}-${c.civico}-${c.comune}`)


    return (
        <div className="grid grid-cols-4 gap-24 mt-14">
            <SelectWithSearch tipo="Cantiere" selected={selectedCantiere} setSelected={setSelectedCantiere}
                              items={nomiCantieri} placeholder="Cantiere"/>
            <SelectWithSearch tipo="Impresa" selected={selectedImpresa} setSelected={setSelectedImpresa}
                              items={['Impresa1', 'Impresa2']} placeholder="Impresa"/>
            <SelectWithSearch tipo="Luogo" selected={selectedLuogo} setSelected={setSelectedLuogo}
                              items={['Luogo1', 'Luogo2']} placeholder="Luogo"/>
            <SelectWithSearch tipo="Maestranza" selected={selectedMaestranza} setSelected={setSelectedMaestranza}
                              items={['Maestranza1', 'Maestranza2']} placeholder="Maestranza"/>
        </div>
    )

}