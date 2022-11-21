import React from 'react';
import {AiOutlinePlus} from "react-icons/ai";

interface CreationBoxGridProps {
    setObjectToCreate: (s: string | undefined) => void,
    setBreadcrumbsItems: (s:string[]) => void
}

export const CreationBoxGrid: React.FC<CreationBoxGridProps> = (
    {
        setObjectToCreate, setBreadcrumbsItems
    }
) => {
    return (
        <>
            <div className="border-l border-l-black w-2/5 px-10">
                <div className="grid grid-cols-2 gap-10">
                    <div className="bg-amber-100 rounded-xl p-16 flex flex-col items-center hover:cursor-pointer hover:opacity-60"
                         onClick={() => {
                             setObjectToCreate("Impresa")
                             setBreadcrumbsItems(["Home", "Creazione Impresa"])
                         }}
                    >
                        <AiOutlinePlus size="30px" className="text-amber-500"/>
                        <span className="text-amber-500 font-semibold">Crea Impresa</span>
                    </div>
                    <div className="bg-amber-100 rounded-xl p-16 flex flex-col items-center hover:cursor-pointer hover:opacity-60"
                         onClick={() => {
                             setObjectToCreate("Maestranza")
                             setBreadcrumbsItems(["Home", "Creazione Maestranza"])
                         }}
                    >
                        <AiOutlinePlus size="30px" className="text-amber-500"/>
                        <span className="text-amber-500 font-semibold">Crea Maestranza</span>
                    </div>
                    <div className="bg-amber-100 rounded-xl p-16 flex flex-col items-center hover:cursor-pointer hover:opacity-60"
                         onClick={() => {
                             setObjectToCreate("Macchina")
                             setBreadcrumbsItems(["Home", "Creazione Macchina"])
                         }}
                    >
                        <AiOutlinePlus size="30px" className="text-amber-500"/>
                        <span className="text-amber-500 font-semibold">Crea Macchina</span>
                    </div>
                    <div className="bg-amber-100 rounded-xl p-16 flex flex-col items-center hover:cursor-pointer hover:opacity-60"
                         onClick={() => {
                             setObjectToCreate("Cantiere")
                             setBreadcrumbsItems(["Home", "Creazione Cantiere"])
                         }}
                    >
                        <AiOutlinePlus size="30px" className="text-amber-500"/>
                        <span className="text-amber-500 font-semibold">Crea Cantiere</span>
                    </div>
                </div>
            </div>
        </>
    )

}