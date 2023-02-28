import React from 'react';
import {setTemporaryOrganization} from "../../utils/auth0/auth0";

interface HomeProps {
    setOrganization: (s: string) => void,
}

export const Login: React.FC<HomeProps> = ({setOrganization}) => {
    return (
        <>
            <div className="p-10 flex flex-col items-center ">
                <div className="w-full flex justify-center items-center">
                    <div className="w-1/5 sm:w-1/4 lg:w-1/3">
                        <hr className="border border-gray-300"/>
                    </div>
                    <div className="w-3/5 sm:w-2/4 lg:w-1/3 flex justify-center items-center">
                    <img src="/img/logo.png" alt="logo sikurezza"/>
                    </div>
                    <div className="w-1/5 sm:w-1/4 lg:w-1/3">
                        <hr className="border border-gray-300"/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:place-content-between py-10 md:py-32">
                    <div className="flex-col w-3/5 md:w-2/5 md:flex-col- text-center" onClick={() => {
                        setOrganization("Impresa")
                        setTemporaryOrganization("Impresa")
                    }}>
                        <div className="px-5 py-5 border border-amber-500 rounded-lg flex justify-center">
                            <img src="/img/impresa.png" className="w-[80%]"/>
                        </div>
                        <div><h5 className="mt-2 md:mt-8 mb-8 text-2xl md:text-5xl text-amber-500">IMPRESA</h5></div>
                    </div>
                    
                    <div className="flex-col w-3/5 md:w-2/5 text-center" onClick={() => {
                        setOrganization("Coordinatore")
                        setTemporaryOrganization("Coordinatore")
                    }}>
                        <div className="px-5 py-5 border border-amber-500 rounded-lg flex justify-center">
                            <img src="/img/coordinatore.png" className="w-[80%]"/>
                        </div>
                        <div><h5 className="mt-2 md:mt-8 mb-8 text-2xl md:text-5xl text-amber-500">COORDINATORE</h5></div>
                    </div>
                </div>
            </div>
        </>
    )

}