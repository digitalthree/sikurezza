import React from 'react';
import {deleteFileS3, getFileFromS3} from "../../aws/s3APIs";

export interface VisualizzaEliminaFileProps {
    file: string|File,
    modifica: boolean,
    nome: string,
    eliminaFunction: Function
}

const VisualizzaEliminaFile: React.FC<VisualizzaEliminaFileProps> = ({file, modifica, nome, eliminaFunction}) => {
    return (
        <>
            <div className="flex col-span-3 gap-4 justify-center">
                <div className="btn btn-active btn-ghost btn-sm hover:opacity-70"
                        onClick={() => getFileFromS3(file)}>
                    Visualizza File
                </div>
                {modifica &&
                    <div className="btn btn-active btn-error btn-sm hover:opacity-70"
                            onClick={() => {
                                if(typeof file === "string"){
                                    let confirm = window.confirm("Sicuro di eliminare il file?")
                                    if(confirm){
                                        deleteFileS3(file).then(() => {
                                            eliminaFunction()
                                        })
                                    }
                                }else{
                                        eliminaFunction()
                                }
                            }}>
                        Elimina File
                    </div>
                }
            </div>
        </>
    )
}

export default VisualizzaEliminaFile