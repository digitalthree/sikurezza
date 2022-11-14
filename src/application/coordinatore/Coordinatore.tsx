import React from 'react';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {clearOrganizationStorages} from "../../utils/auth0/auth0";

interface CoordinatoreProps {
}

const Coordinatore: React.FC<CoordinatoreProps> = ({}) => {

    const {logout} = useAuth0();

    return(
        <>
            <button onClick={() => {
                clearOrganizationStorages()
                logout({returnTo: "http://localhost:3000/"})
            }}>
                Log Out Coordinatore
            </button>
        </>
    )
}

export default withAuthenticationRequired(Coordinatore)

