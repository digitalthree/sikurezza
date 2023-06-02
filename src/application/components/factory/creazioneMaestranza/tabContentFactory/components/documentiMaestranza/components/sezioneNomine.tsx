import React, {useEffect, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    MaestranzaDaCreareSelector,
    MaestranzaSelezionataSelector,
    setConsegnatoInMaestranza, setFileInDocumentiMaestranza, setNominaInMaestranza
} from "../../../../../../../../store/maestranzaSlice";
import VisualizzaEliminaFile from "../../../../../../../../shared/Files/VisualizzaEliminaFile";
import InputFile from "../../../../../../../../shared/Files/InputFile";

export interface SezioneNomineProps {
    register: Function,
    errors: FieldErrors,
    editabile: boolean,
    modifica: boolean,
}

const SezioneNomine: React.FC<SezioneNomineProps> = (
    {
        register, errors, editabile, modifica
    }
) => {

    const maestranzaSelezionata = useSelector(MaestranzaSelezionataSelector)
    const maestranzaDaCreare = useSelector(MaestranzaDaCreareSelector)
    const [maestranza, setMaestranza] = useState(maestranzaDaCreare)
    useEffect(() => {
        if (maestranzaSelezionata) {
            setMaestranza(maestranzaSelezionata)
        }else{
            setMaestranza(maestranzaDaCreare)
        }
    }, [maestranzaSelezionata, maestranzaDaCreare])
    let nominaDaPreposto = maestranza?.documenti.filter(d => d.nome === 'nominaDaPreposto')[0].file
    let nominaDaRSPP = maestranza?.documenti.filter(d => d.nome === 'nominaDaRSPP')[0].file
    let nominaDaRLS = maestranza?.documenti.filter(d => d.nome === 'nominaDaRLS')[0].file
    let nominaDaAddettoPSoccorso = maestranza?.documenti.filter(d => d.nome === 'nominaDaAddettoPSoccorso')[0].file
    let nominaDaAddettoPrevIncendi = maestranza?.documenti.filter(d => d.nome === 'nominaDaAddettoPrevIncendi')[0].file
    const dispatch = useDispatch()

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <span className="font-bold col-span-2">Nomina da Preposto: </span>
                <div className="col-span-2 flex flex-row">
                    NO
                    <input type="checkbox" className="toggle ml-2 mr-2" {...register('nominaDaPreposto')}
                           disabled={!editabile}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           onChange={(e) => dispatch(setNominaInMaestranza({
                               nome: 'nominaDaPreposto',
                               value: e.target.checked
                           }))}
                           defaultChecked={maestranza.documenti?.filter(d => d.nome === 'nominaDaPreposto')[0].nomina}/>
                    SI
                </div>
                <span className="col-span-4"></span>
                {nominaDaPreposto ?
                    <VisualizzaEliminaFile file={nominaDaPreposto} modifica={editabile}
                                           nome="nominaDaPreposto"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({
                                               nome: "nominaDaPreposto",
                                               file: undefined
                                           }))}
                    /> :
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'nominaDaPreposto',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Nomina da RSPP: </span>
                <div className="col-span-2 flex flex-row">
                    NO
                    <input type="checkbox" className="toggle ml-2 mr-2" {...register('nominaDaRSPP')}
                           disabled={!editabile}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           onChange={(e) => dispatch(setNominaInMaestranza({
                               nome: 'nominaDaRSPP',
                               value: e.target.checked
                           }))}
                           defaultChecked={maestranza.documenti?.filter(d => d.nome === 'nominaDaRSPP')[0].nomina}/>
                    SI
                </div>
                <span className="col-span-4"></span>
                {nominaDaRSPP ?
                    <VisualizzaEliminaFile file={nominaDaRSPP} modifica={editabile} nome="nominaDaRSPP"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({
                                               nome: "nominaDaRSPP",
                                               file: undefined
                                           }))}
                    /> :
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'nominaDaRSPP',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Nomina da RLS: </span>
                <div className="col-span-2 flex flex-row">
                    NO
                    <input type="checkbox" className="toggle ml-2 mr-2" {...register('nominaDaRLS')}
                           disabled={!editabile}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           onChange={(e) => dispatch(setNominaInMaestranza({
                               nome: 'nominaDaRLS',
                               value: e.target.checked
                           }))}
                           defaultChecked={maestranza.documenti?.filter(d => d.nome === 'nominaDaRLS')[0].nomina}/>
                    SI
                </div>
                <span className="col-span-4"></span>
                {nominaDaRLS ?
                    <VisualizzaEliminaFile file={nominaDaRLS} modifica={editabile} nome="nominaDaRLS"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({
                                               nome: "nominaDaRLS",
                                               file: undefined
                                           }))}
                    /> :
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'nominaDaRLS',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Nomina da AddettoPSoccorso: </span>
                <div className="col-span-2 flex flex-row">
                    NO
                    <input type="checkbox" className="toggle ml-2 mr-2" {...register('nominaDaAddettoPSoccorso')}
                           disabled={!editabile}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           onChange={(e) => dispatch(setNominaInMaestranza({
                               nome: 'nominaDaAddettoPSoccorso',
                               value: e.target.checked
                           }))}
                           defaultChecked={maestranza.documenti?.filter(d => d.nome === 'nominaDaAddettoPSoccorso')[0].nomina}/>
                    SI
                </div>
                <span className="col-span-4"></span>
                {nominaDaAddettoPSoccorso ?
                    <VisualizzaEliminaFile file={nominaDaAddettoPSoccorso} modifica={editabile}
                                           nome="nominaDaAddettoPSoccorso"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({
                                               nome: "nominaDaAddettoPSoccorso",
                                               file: undefined
                                           }))}
                    /> :
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'nominaDaAddettoPSoccorso',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <span className="font-bold col-span-2">Nomina da AddettoPrevIncendi: </span>
                <div className="col-span-2 flex flex-row">
                    NO
                    <input type="checkbox" className="toggle ml-2 mr-2" {...register('nominaDaAddettoPrevIncendi')}
                           disabled={!editabile}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   e.preventDefault()
                               }
                           }}
                           onChange={(e) => dispatch(setNominaInMaestranza({
                               nome: 'nominaDaAddettoPrevIncendi',
                               value: e.target.checked
                           }))}
                           defaultChecked={maestranza.documenti?.filter(d => d.nome === 'nominaDaAddettoPrevIncendi')[0].nomina}/>
                    SI
                </div>
                <span className="col-span-4"></span>
                {nominaDaAddettoPrevIncendi ?
                    <VisualizzaEliminaFile file={nominaDaAddettoPrevIncendi as string} modifica={editabile}
                                           nome="nominaDaAddettoPrevIncendi"
                                           eliminaFunction={() => dispatch(setFileInDocumentiMaestranza({
                                               nome: "nominaDaAddettoPrevIncendi",
                                               file: undefined
                                           }))}
                    /> :
                    <InputFile editabile={editabile} onChangeFunction={(e) => dispatch(setFileInDocumentiMaestranza({
                        nome: 'nominaDaAddettoPrevIncendi',
                        file: (e.target.files) ? e.target.files[0] : undefined
                    }))}/>
                }
            </div>
            <hr className="my-5"/>
        </>
    )
}

export default SezioneNomine