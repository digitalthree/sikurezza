import React from 'react';
import CreazioneMaestranza from "../../components/factory/creazioneMaestranza/CreazioneMaestranza";

export interface CreazioneMaestranzaModaleProps{

}

const CreazioneMaestranzaModale: React.FC<CreazioneMaestranzaModaleProps> = ({}) => {
    return(
        <>
            <input type="checkbox" id="my-modal-8" className="modal-toggle"/>
            <label htmlFor="my-modal-8" className="modal cursor-pointer">
                <label className="modal-box relative max-w-5xl">
                    <CreazioneMaestranza/>
                </label>
            </label>
        </>
    )
}

export default CreazioneMaestranzaModale