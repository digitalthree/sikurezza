import React from 'react';
import {HeaderImpresa} from "../header/HeaderImpresa";
import {Outlet} from "react-router-dom";
import {Footer} from "../footer/Footer";
import { Breadcrumb } from '../breadcrumb/Breadcrumb';

export interface SharedLayoutProps {

}

const SharedLayout: React.FC<SharedLayoutProps> = ({}) => {
    return (
        <>
            <div className="flex flex-col justify-between min-h-screen">
                <div className="lg:px-14 xl:px-20 px-6 py-5 pt-3">
                    <HeaderImpresa/>
                    <Breadcrumb/>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default SharedLayout