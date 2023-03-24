import React from 'react';

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