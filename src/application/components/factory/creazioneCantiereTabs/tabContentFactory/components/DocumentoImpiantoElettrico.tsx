import React, {useState} from 'react';
import {
    CantiereDaCreareSelector,
    CantiereSelezionatoSelector,
    setDocumentoImpiantoElettricoInCantiere
} from "../../../../../../store/cantiereSlice";
import VisualizzaEliminaFile from "../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../shared/Files/InputFile";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

export interface DocumentoImpiantoElettricoProps{
    nome: string,
    label: boolean
}

const DocumentoImpiantoElettrico: React.FC<DocumentoImpiantoElettricoProps> = ({nome, label}) => {

    const cantiereDaCreare = useSelector(CantiereDaCreareSelector)
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)
    const dispatch = useDispatch()
    const location = useLocation()
    const doc = cantiereSelezionato?.impiantoElettrico.documentiImpiantoElettrico.filter(d => d.nome === nome)[0]
    const [documento, setDocumento] = useState<{ presenza: boolean, file: File | undefined | string }>({
        presenza: doc && doc.presenza ?  doc.presenza : false ,
        file: doc && doc.file ? doc.file.value : undefined
    })

    return(
        <div
            className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
        >
        <span className="w-12/12 md:w-4/12">
          {nome}
        </span>
            <div
                className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
                <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
                    {label ? "Non Protetto" : "NO"}
                    <input type="checkbox" name="conformita" className="toggle mx-2"
                           disabled={!location.state.editabile}
                           checked={documento.presenza}
                           onChange={(e) => {
                               setDocumento({
                                   presenza: e.target.checked,
                                   file: documento.file
                               })
                               dispatch(setDocumentoImpiantoElettricoInCantiere({
                                   nome: nome,
                                   presenza: e.target.checked,
                                   file: documento.file
                               }))
                           }}/>
                    {label ? "Protetto" : "SI"}
                </div>
                {documento.file ?
                    <VisualizzaEliminaFile
                        file={documento.file}
                        modifica={location.state.modifica}
                        nome={""}
                        eliminaFunction={() => {
                            setDocumento({presenza: false, file: undefined})
                            dispatch(setDocumentoImpiantoElettricoInCantiere({
                                nome: nome,
                                presenza: false,
                                file: undefined
                            }))
                        }}
                    /> :
                    <InputFile editabile={location.state.editabile} onChangeFunction={(e) => {
                        if (e.target.files) {
                            setDocumento({
                                presenza: true,
                                file: e.target.files[0]
                            })
                            dispatch(setDocumentoImpiantoElettricoInCantiere({
                                nome: nome,
                                presenza: true,
                                file: e.target.files[0]
                            }))
                        }

                    }}/>
                }
            </div>
        </div>
    )
}

export default DocumentoImpiantoElettrico