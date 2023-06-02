import React from 'react';
import CreazioneMaestranza from "../../components/factory/creazioneMaestranza/CreazioneMaestranza";

export interface CreazioneMaestranzaModaleProps{
    editabile: boolean
    modifica: boolean
}

const CreazioneMaestranzaModale: React.FC<CreazioneMaestranzaModaleProps> = ({editabile, modifica}) => {
    return(
        <>
            <input type="checkbox"
                   onKeyDown={(e) => {
                       if(e.key === "Enter"){
                           e.preventDefault()
                       }
                   }}
                   id="my-modal-8"
                   className="modal-toggle"
            />
            <label htmlFor="my-modal-8" className="modal cursor-pointer">
                <label className="modal-box relative max-w-[1440px]">
                    <CreazioneMaestranza editabile={editabile} modifica={modifica}/>
                </label>
            </label>
        </>
    )
}

export default CreazioneMaestranzaModale