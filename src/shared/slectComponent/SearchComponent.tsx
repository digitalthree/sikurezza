import React, {Fragment, useState} from 'react';
import {Combobox, Transition} from "@headlessui/react";
import {HiArrowsUpDown} from "react-icons/hi2";
import {BiCheck} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {
    CantieriSelector,
    selezionaCantiere,
    trovaCantiereByNomeAndIndirizzo
} from "../../store/cantiereSlice";
import {Cantiere} from "../../model/Cantiere";
import {ImpreseSelector, setImpresaSelezionata} from "../../store/impresaSlice";
import {BsSearch} from "react-icons/bs";


interface SelectWithSearchProps {
    placeholder: string
    onChangeFunction: (ev:  React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchComponent: React.FC<SelectWithSearchProps> = (
    {
        placeholder, onChangeFunction
    }
) => {

    return (
        <div className="form-control">
            <label className="input-group input-group-md">
                <span><BsSearch/></span>
                <input type="text" placeholder={placeholder} className="input input-bordered input-md"
                    onChange={(e) => onChangeFunction(e)}
                />
            </label>
        </div>
    )

}