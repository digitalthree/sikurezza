import React from 'react';
import {HeaderImpresa} from "../header/HeaderImpresa";
import {Outlet} from "react-router-dom";
import {Footer} from "../footer/Footer";

export interface SharedLayoutProps {

}

const SharedLayout: React.FC<SharedLayoutProps> = ({}) => {
    return (
        <>
            <div className="flex flex-col justify-between min-h-screen">
                <div className=" lg:px-32 px-10 py-5 pt-3">
                    <HeaderImpresa/>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default SharedLayout