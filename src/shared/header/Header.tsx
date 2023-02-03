import React from 'react';

interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = ({}) => {
    return(
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <img src="/img/logo.png" alt="logo sikurezza" className="xl:w-[15%]"/>
            </div>
        </div>
    )

}