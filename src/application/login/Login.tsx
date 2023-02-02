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
                    <div className="w-1/3">
                        <hr className="border border-gray-300"/>
                    </div>
                    <img src="/img/logo.png" alt="logo sikurezza"/>
                    <div className="w-1/3">
                        <hr className="border border-gray-300"/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-80 py-32">
                    <div className="flex-col text-center" onClick={() => {
                        setOrganization("Impresa")
                        setTemporaryOrganization("Impresa")
                    }}>
                        <div className="px-5 py-5 border border-amber-500 rounded-lg flex justify-center">
                            <img src="/img/impresa.png" className="w-[80%]"/>
                        </div>
                        <div><h5 className="mt-10 text-5xl text-amber-500">IMPRESA</h5></div>
                    </div>
                    <div className="flex-col text-center" onClick={() => {
                        setOrganization("Coordinatore")
                        setTemporaryOrganization("Coordinatore")
                    }}>
                        <div className="px-5 py-5 border border-amber-500 rounded-lg flex justify-center">
                            <img src="/img/coordinatore.png" className="w-[80%]"/>
                        </div>
                        <div><h5 className="mt-10 text-5xl text-amber-500">COORDINATORE</h5></div>
                    </div>
                </div>
            </div>
        </>
    )

}