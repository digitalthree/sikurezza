import React from 'react';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {clearOrganizationStorages} from "../../utils/auth0/auth0";
interface ImpresaProps {
}

const Impresa: React.FC<ImpresaProps> = ({}) => {

    const {logout} = useAuth0()

    return (
        <>
            <button onClick={() => {
                clearOrganizationStorages()
                logout({returnTo: "http://localhost:3000/"})
            }}>
                Log Out Impresa
            </button>
        </>
    )
}

export default withAuthenticationRequired(Impresa)