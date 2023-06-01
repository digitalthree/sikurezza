import React from 'react';
import {setFileInDocumentiMaestranza} from "../../store/maestranzaSlice";
import {useDispatch} from "react-redux";

export interface InputFileProps{
    editabile: boolean,
    onChangeFunction: (ev:  React.ChangeEvent<HTMLInputElement>) => void
}

const InputFile: React.FC<InputFileProps> = ({editabile, onChangeFunction}) => {
    return(
        <>
            <input type="file"
                   onKeyDown={(e) => {
                       if(e.key === "Enter"){
                           e.preventDefault()
                       }
                   }}
                   className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                   disabled={!editabile}
                   onChange={(e) => onChangeFunction(e)}
            />
        </>
    )
}

export default InputFile