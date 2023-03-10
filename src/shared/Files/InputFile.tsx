import React from 'react';
import {setFileInDocumentiMaestranza} from "../../store/maestranzaSlice";
import {useDispatch} from "react-redux";

export interface InputFileProps{
    editabile: boolean,
    nome: string,
}

const InputFile: React.FC<InputFileProps> = ({editabile, nome}) => {
    const dispatch = useDispatch()
    return(
        <>
            <input type="file"
                   className="file-input file-input-secondary file-input-sm w-full max-w-xs col-span-4"
                   disabled={!editabile}
                   onChange={(e) => {
                       if (e.target.files && e.target.files[0]) {
                           //onChange(e.target.files[0], 'contrattoFile')
                           dispatch(setFileInDocumentiMaestranza({nome: nome, file:e.target.files[0]}))
                       }
                   }}
            />
        </>
    )
}

export default InputFile