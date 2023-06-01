import React, {useState} from 'react';
import {ControlloCantiere} from "../../../../../../model/Cantiere";
import InputFile from "../../../../../../shared/Files/InputFile";
import VisualizzaEliminaFile from "../../../../../../shared/Files/VisualizzaEliminaFile";
import {useLocation} from "react-router-dom";

export interface NotaProps{
    controlliPeriodici: ControlloCantiere[],
    setControlliPeriodici: Function,
    label: string,
    labelSubTitle?: string
}

const Nota: React.FC<NotaProps> = ({controlliPeriodici,setControlliPeriodici, label, labelSubTitle}) => {


    const [dataNota, setDataNota] = useState("")
    const [nota, setNota] = useState("")
    const [fileNota, setFileNota] = useState<File|undefined>(undefined)


    const location = useLocation()

    return(
        <div
            className="flex flex-col md:flex-row w-full mx-auto lg:w-10/12 xl:w-9/12 2xl:w-9/12
                              justify-center items-center my-4 mt-12 text-right leading-4 font-semibold"
        >
            <span className="w-full text-center md:text-right my-3 md:w-3/12 flex flex-col">
                {label}
                {labelSubTitle && <i className="font-light mt-1 text-sm">{labelSubTitle}</i>}
            </span>
            {controlliPeriodici.length === 0 ?
                <div className="w-full md:w-7/12 border-slate-300 border-y flex flex-row sm:ml-16">
                    <div className="flex flex-col w-6/12 text-center mt-2">
                        <input type="date" className="border-slate-300 border-b font-normal py-2"
                               disabled={!location.state.editabile}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               placeholder="Data" value={dataNota}
                               onChange={(e) => setDataNota(e.currentTarget.value)}/>
                        <input type="text" className="font-normal text-left p-2 leading-5"
                               disabled={!location.state.editabile}
                               onKeyDown={(e) => {
                                   if(e.key === "Enter"){
                                       e.preventDefault()
                                   }
                               }}
                               placeholder="Inserisci Nota" value={nota}
                               onChange={(e) => setNota(e.currentTarget.value)}/>
                    </div>
                    <div className="divider divider-horizontal py-2"/>
                    <div className="flex flex-col w-6/12 text-center my-2 justify-evenly">
                        <InputFile editabile={location.state.editabile} onChangeFunction={(e) => {
                            (e.target.files) && setFileNota(e.target.files[0])
                        }}/>
                        <button className="btn btn-sm border-0 text-white mt-2"
                                disabled={!location.state.editabile}
                                onClick={() => {
                                    let newNota: ControlloCantiere = {
                                        data: dataNota,
                                        nota: nota,
                                        file: {nome: nota, value: fileNota}
                                    }
                                    setControlliPeriodici([...controlliPeriodici, newNota])
                                }}
                        >
                            Aggiungi Nota
                        </button>
                    </div>
                </div>
                :
                <div className="flex flex-col mx-auto justify-center items-center my-4 mt-12 text-right leading-4">
                    <div className="overflow-y-auto w-full max-h-[300px] border-2 p-6 rounded mb-5">
                        {controlliPeriodici.map(cp => {
                            console.log(cp)
                            return (
                                <div className="w-full mb-2">
                                    <div className="w-full border-slate-300 border-y flex flex-row sm:ml-3">
                                        <div className="flex flex-col w-7/12 text-center mt-2">
                                        <span className="border-slate-300 border-b font-normal py-2">
                                          {cp.data}
                                        </span>
                                            <span className="font-normal text-left p-2 leading-5">
                                          {cp.nota}
                                        </span>
                                        </div>
                                        <div className="divider divider-horizontal py-2"></div>
                                        <div className="flex flex-col w-5/12 text-center my-2 justify-evenly">
                                            {cp.file.value ?
                                                <VisualizzaEliminaFile file={cp.file.value as File} modifica={false}
                                                                       nome={cp.file.nome} eliminaFunction={() => {
                                                }}/> :
                                                <span>Nessun File</span>
                                            }
                                            <button className="btn btn-sm btn-disabled border-0 text-white mt-2">
                                                Esporta Nota
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full border-slate-300 border-y flex flex-row sm:ml-3">
                        <div className="flex flex-col w-7/12 text-center mt-2">
                            <input type="date" className="border-slate-300 border-b font-normal py-2"
                                   disabled={!location.state.editabile}
                                   onKeyDown={(e) => {
                                       if(e.key === "Enter"){
                                           e.preventDefault()
                                       }
                                   }}
                                   placeholder="Data" value={dataNota}
                                   onChange={(e) => setDataNota(e.currentTarget.value)}/>
                            <input type="text" className="font-normal text-left p-2 leading-5"
                                   disabled={!location.state.editabile}
                                   onKeyDown={(e) => {
                                       if(e.key === "Enter"){
                                           e.preventDefault()
                                       }
                                   }}
                                   placeholder="Inserisci Nota" value={nota}
                                   onChange={(e) => setNota(e.currentTarget.value)}/>
                        </div>
                        <div className="divider divider-horizontal py-2"/>
                        <div className="flex flex-col w-5/12 text-center my-2 justify-evenly">
                            <InputFile editabile={location.state.editabile} onChangeFunction={(e) => {
                                (e.target.files) && setFileNota(e.target.files[0])
                            }}/>
                            <button
                                className="btn btn-sm border-0 text-white mt-2 hover:cursor-pointer hover:opacity-70"
                                disabled={!location.state.editabile}
                                onClick={() => {
                                    let newNota: ControlloCantiere = {
                                        data: dataNota,
                                        nota: nota,
                                        file: {nome: nota, value: fileNota}
                                    }
                                    setControlliPeriodici([...controlliPeriodici, newNota])
                                }
                                }
                            >
                                Aggiungi Nota
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Nota