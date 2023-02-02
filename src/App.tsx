import React, {useState} from 'react';
import {Login} from "./application/login/Login";

import {Auth0Provider} from "@auth0/auth0-react";
import {
    getAuthorisedOrganization,
    getTemporaryOrganization,
    isAuth0RedirectUrl,
    setAuthorisedOrganizationFromTemporaryStorage
} from "./utils/auth0/auth0";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Home from "./application/components/home/Home";

function App() {

    const [organization, setOrganization] = useState<string | null>(() => {
        return isAuth0RedirectUrl()
            ? getTemporaryOrganization()
            : getAuthorisedOrganization();
    });

    if (!organization) {
        return <Login setOrganization={setOrganization}/>
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
                {/*{organization === "Impresa" && <Home/>}
                {organization === "Coordinatore" && <Home/>}*/}
                <Home/>
            </Provider>
        </Auth0Provider>
    )
}

export default App;
