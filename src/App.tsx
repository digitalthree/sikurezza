import React, {useEffect, useState} from 'react';
import {Home} from "./application/home/Home";
import Coordinatore from "./application/coordinatore/Coordinatore";
import Impresa from "./application/impresa/Impresa";
import {Auth0Provider} from "@auth0/auth0-react";
import {
    getAuthorisedOrganization,
    getTemporaryOrganization,
    isAuth0RedirectUrl,
    setAuthorisedOrganizationFromTemporaryStorage
} from "./utils/auth0/auth0";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {

    const [organization, setOrganization] = useState<string | null>(() => {
        return isAuth0RedirectUrl()
            ? getTemporaryOrganization()
            : getAuthorisedOrganization();
    });

    if (!organization) {
        return <Home setOrganization={setOrganization}/>
    }
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
                {organization === "Impresa" && <Impresa/>}
                {organization === "Coordinatore" && <Coordinatore/>}
            </Provider>
        </Auth0Provider>
    )
}

export default App;
