import React from 'react';
import {deleteFileS3, getFileFromS3} from "../../aws/s3APIs";
import {setFileInDocumentiMaestranza} from "../../store/maestranzaSlice";
import {useDispatch} from "react-redux";

export interface VisualizzaEliminaFileProps {
    file: string|File,
    modifica: boolean,
    nome: string
}

const VisualizzaEliminaFile: React.FC<VisualizzaEliminaFileProps> = ({file, modifica, nome}) => {
    const dispatch = useDispatch()
    return (
        <>
            <div className="flex col-span-4 gap-10">
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
                                        deleteFileS3(file).then((res) => {
                                            if(res !== false){
                                                dispatch(setFileInDocumentiMaestranza({nome: nome, file: undefined}))
                                            }
                                        })
                                    }
                                }else{
                                    dispatch(setFileInDocumentiMaestranza({nome: nome, file: undefined}))
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