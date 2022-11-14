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

function App() {

    const [organization, setOrganization] = useState<string | null>(() => {
        return isAuth0RedirectUrl()
            ? getTemporaryOrganization()
            : getAuthorisedOrganization();
    });



    return (
        <>
            {!organization && <Home setOrganization={setOrganization}/>}
            {(organization) &&
                <Auth0Provider
                    domain="dev-70zdl84pcu4rhngr.us.auth0.com"
                    clientId="PGbhUhgNCnhpxDYgZfefIvWHvrgHXM9e"
                    redirectUri={window.location.origin}
                    connection={organization as string}
                    onRedirectCallback={() => setAuthorisedOrganizationFromTemporaryStorage()}
                >
                    {organization === "Impresa" && <Impresa/>}
                    {organization === "Coordinatore" && <Coordinatore/>}
                </Auth0Provider>
            }
        </>
    );

}

export default App;
