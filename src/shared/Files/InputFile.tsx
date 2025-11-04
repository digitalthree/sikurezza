import React from 'react';
import {setFileInDocumentiMaestranza} from "../../store/maestranzaSlice";
import {useDispatch} from "react-redux";

export interface InputFileProps{
    editabile: boolean,
    onChangeFunction: (ev:  React.ChangeEvent<HTMLInputElement>) => void,
    accept?: 'image' | 'pdf'
}

const InputFile: React.FC<InputFileProps> = ({editabile, onChangeFunction, accept}) => {
    return(
        <>
            <input type="file"
                   accept={accept && accept === 'image' ? 'image/png, image/jpeg': 'application/pdf'}
                   onKeyDown={(e) => {
                       if(e.key === "Enter"){
                           e.preventDefault()
                       }
                   }}
                   className="file-input file-input-secondary xl:file-input-sm file-input-xs w-full max-w-xs flex col-span-3 mx-auto"
                   disabled={!editabile}
                   onChange={(e) => onChangeFunction(e)}
            />
        </>
    )
}

export default InputFile