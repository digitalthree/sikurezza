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
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import SezioneImpresa from "./application/components/home/components/SezioneImpresa";
import {CreazioneImpresa} from "./application/components/factory/creazioneImpresa/CreazioneImpresa";
import SharedLayout from "./shared/sharedLayout/SharedLayout";
import EstintoreTab from "./application/mirkoComponents/EstintoreTab";
import PonteggioTab from "./application/mirkoComponents/PonteggioTab";
import MacchineAttrezzatureTab from "./application/mirkoComponents/MacchineAttrezzatureTab";
import MaestranzeTab from "./application/mirkoComponents/MaestranzeTab";
import GruTab from "./application/mirkoComponents/GruTab";
import CreazioneMaestranza from "./application/components/factory/creazioneMaestranza/CreazioneMaestranza";
import TotalControl from "./application/totalControl/TotalControl";
import CreazioneCantiereTabs from "./application/components/factory/creazioneCantiereTabs/CreazioneCantiereTabs";

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SharedLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="impresa/:faunaDocumentId" element={<SezioneImpresa/>}>
                  <Route path="estintori" element={<EstintoreTab/>}/>
                  <Route path="ponteggi" element={<PonteggioTab/>}/>
                  <Route path="gru" element={<GruTab/>}/>
                  <Route path="macchineEAttrezzature" element={<MacchineAttrezzatureTab/>}/>
                  <Route path="maestranze" element={<MaestranzeTab/>}/>
                  <Route path="maestranza" element={<CreazioneMaestranza setObjectToCreate={setObjectToCreate}/>}/>
                  <Route path="anagrafica" element={<CreazioneImpresa setObjectToCreate={setObjectToCreate} primoAccesso={false}/>}/>
                  <Route path="cantieri" element={<CreazioneCantiereTabs/>}/>
                </Route>
                <Route path="creazione/impresa" element={<CreazioneImpresa setObjectToCreate={setObjectToCreate} primoAccesso={true}/>}/>
                <Route path="totalControl" element={<TotalControl/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </Auth0Provider>
  )
}

export default App;

