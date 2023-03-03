import React, {useState} from 'react';
import {Login} from "./application/login/Login";

import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import {
    clearOrganizationStorages,
    getAuthorisedOrganization,
    getTemporaryOrganization,
    isAuth0RedirectUrl,
    setAuthorisedOrganizationFromTemporaryStorage
} from "./utils/auth0/auth0";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Home from "./application/components/home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Header} from "./shared/header/Header";
import { Footer } from './shared/footer/Footer';
import SezioneImpresa from "./application/components/home/components/SezioneImpresa";
import {CreazioneImpresa} from "./application/components/factory/creazioneImpresa/CreazioneImpresa";
import EstintoreTab from './application/mirkoComponents/EstintoreTab';

function App() {

    const [organization, setOrganization] = useState<string | null>(() => {
        return isAuth0RedirectUrl()
            ? getTemporaryOrganization()
            : getAuthorisedOrganization();
    });
    const [objectToCreate, setObjectToCreate] = useState<string | undefined>(undefined);

    if (!organization) {
        return <Login setOrganization={setOrganization}/>
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/impresa",
            element: <SezioneImpresa/>
        },
        {
            path: "/creazione/impresa",
            element: <CreazioneImpresa setObjectToCreate={setObjectToCreate} primoAccesso={false}/>
        }
    ])

    return (
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
            clientId={process.env.REACT_APP_AUTH0_ID as string}
            redirectUri={window.location.origin}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE as string}
            connection={organization as string}
            onRedirectCallback={() => setAuthorisedOrganizationFromTemporaryStorage()}
        >
            <Provider store={store}>
                {/*{organization === "Impresa" && <Home/>}
                {organization === "Coordinatore" && <Home/>}*/}
                <div className="flex flex-col justify-between min-h-screen">
                <div className=" lg:px-32 px-10 py-5">
                    <Header/>
                    <RouterProvider router={router}/>
                </div>
                <Footer/>
                </div>
            </Provider>
        </Auth0Provider>
    )
}

export default App;
