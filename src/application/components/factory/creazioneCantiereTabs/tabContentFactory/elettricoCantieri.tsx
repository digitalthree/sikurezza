import React, {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {TfiSave} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {ImpresaSelezionataSelector, ImpreseSelector} from "../../../../../store/impresaSlice";
import {Impresa} from "../../../../../model/Impresa";
import {
    addCantiere,
    CantiereDaCreareSelector, CantiereSelezionatoSelector, setControlloCantiereGru, setControlloCantierePonteggio,
    setDenunciaImpiantoElettricoInCantiere,
    setDocumentoImpiantoElettricoInCantiere,
    setImpreseEsecutriciOpereElettricheInCantiere,
    setPrepostoImpiantoElettricoInCantiere,
    setRegistroControlliImpiantoElettricoInCantiere,
    setTelefonoPrepostoImpiantoElettricoInCantiere, setVerifichePeriodicheImpiantoElettricoInCantiere
} from "../../../../../store/cantiereSlice";
import InputFile from "../../../../../shared/Files/InputFile";
import VisualizzaEliminaFile from "../../../../../shared/Files/VisualizzaEliminaFile";
import DocumentoImpiantoElettrico from "./components/DocumentoImpiantoElettrico";
import {Cantiere, ControlloCantiere} from "../../../../../model/Cantiere";
import Nota from "./components/Nota";
import {createCantiereInFauna} from "../../../../../faunadb/api/cantiereAPIs";
import {useFaunaQuery} from "../../../../../faunadb/hooks/useFaunaQuery";
import {useAuth0} from "@auth0/auth0-react";
import {uploadFileS3} from "../../../../../aws/s3APIs";
import {useLocation, useNavigate} from "react-router-dom";

export interface ElettricoCantieriProps {
    setIndex: (n: number) => void
}

const ElettricoCantieriTab: React.FC<ElettricoCantieriProps> = ({setIndex}) => {
    const animatedComponents = makeAnimated();
    const impreseFromStore = useSelector(ImpreseSelector)
    const cantiereDaCreare = useSelector(CantiereDaCreareSelector)
    const cantiereSelezionato = useSelector(CantiereSelezionatoSelector)
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    /* MULTI SELECT PER SCEGLIERE LE IMPRESE ESECUTRICI */
    const impresa = impreseFromStore.map(i => {
        return {label: i.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value, value: i}
    })

    const [impresaEsecutrice, setImpresaEsecutrice] = useState(cantiereSelezionato ? [{label: cantiereSelezionato.impiantoElettrico.impresaEsecutriceDelleOpereElettriche.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value, value: cantiereSelezionato.impiantoElettrico.impresaEsecutriceDelleOpereElettriche}] : [{label: "", value: {} as Impresa}])
    const [preposto, setPreposto] = useState(cantiereSelezionato ? cantiereSelezionato.impiantoElettrico.prepostoImpresaEsecutrice : "")
    const [telefonoPreposto, setTelefonoPreposto] = useState(cantiereSelezionato ? cantiereSelezionato.impiantoElettrico.telefonoPrepostoImpresaEsecutrice : "")

    const [registroDiControllo, setRegistroDiControllo] = useState<ControlloCantiere[]>(cantiereSelezionato ? cantiereSelezionato?.impiantoElettrico.registroControllo : [])
    const [verifichePeriodiche, setVerifichePeriodiche] = useState<ControlloCantiere[]>(cantiereSelezionato ? cantiereSelezionato?.impiantoElettrico.verifichePeriodicheAUSL as ControlloCantiere[] : [])

    const [uploadToS3, setUploadToS3] = useState(false)
    const [savedToS3, setSavedToS3] = useState(false)
    const [uploadToFauna, setUploadToFauna] = useState(false)

    const {execQuery} = useFaunaQuery()
    const {user} = useAuth0()

    useEffect(() => {
        if(uploadToS3){
            cantiereDaCreare.gruMezziDiSollevamento.controlliPeriodici.forEach(cp => {
                if(cp.file.value && typeof cp.file.value !== 'string'){
                    uploadFileS3(cp.file.value as File).then((res) => {
                        if (res) {
                            dispatch(setControlloCantiereGru(
                                [...cantiereDaCreare.gruMezziDiSollevamento.controlliPeriodici.filter(cp1 => cp1.nota !== cp.nota),
                                    {nota: cp.nota, data: cp.data, file: {nome: cp.file.nome, value: res.key}}
                            ]))
                        }
                    });
                }
            })
            cantiereDaCreare.ponteggi.controlliPeriodici.forEach(cp => {
                if(cp.file.value && typeof cp.file.value !== 'string'){
                    uploadFileS3(cp.file.value as File).then((res) => {
                        if (res) {
                            dispatch(setControlloCantierePonteggio(
                                [...cantiereDaCreare.ponteggi.controlliPeriodici.filter(cp1 => cp1.nota !== cp.nota),
                                    {nota: cp.nota, data: cp.data, file: {nome: cp.file.nome, value: res.key}}
                                ]))
                        }
                    });
                }
            })
            cantiereDaCreare.impiantoElettrico.registroControllo.forEach(cp => {
                if(cp.file.value && typeof cp.file.value !== 'string'){
                    uploadFileS3(cp.file.value as File).then((res) => {
                        if (res) {
                            dispatch(setRegistroControlliImpiantoElettricoInCantiere(
                                [...cantiereDaCreare.impiantoElettrico.registroControllo.filter(cp1 => cp1.nota !== cp.nota),
                                    {nota: cp.nota, data: cp.data, file: {nome: cp.file.nome, value: res.key}}
                                ]))
                        }
                    });
                }
            })
            cantiereDaCreare.impiantoElettrico.verifichePeriodicheAUSL.forEach(cp => {
                if(cp.file.value && typeof cp.file.value !== 'string'){
                    uploadFileS3(cp.file.value as File).then((res) => {
                        if (res) {
                            dispatch(setVerifichePeriodicheImpiantoElettricoInCantiere(
                                [...cantiereDaCreare.impiantoElettrico.verifichePeriodicheAUSL.filter(cp1 => cp1.nota !== cp.nota),
                                    {nota: cp.nota, data: cp.data, file: {nome: cp.file.nome, value: res.key}}
                                ]))
                        }
                    });
                }
            })
            cantiereDaCreare.impiantoElettrico.documentiImpiantoElettrico.forEach(d => {
                if(d.file.value && typeof d.file.value !== 'string'){
                    uploadFileS3(d.file.value as File).then((res) => {
                        if (res) {
                            dispatch(setDocumentoImpiantoElettricoInCantiere({
                                nome: d.nome, presenza: d.presenza, file: res.key
                            }))
                        }
                    });
                }
            })
            setSavedToS3(true)
        }
    }, [uploadToS3])

    useEffect(() => {
        if(savedToS3){
            if(cantiereDaCreare.gruMezziDiSollevamento.controlliPeriodici.filter(d => !d.file.value || typeof d.file.value === 'string').length === Object.entries(cantiereDaCreare.gruMezziDiSollevamento.controlliPeriodici).length){
                if(cantiereDaCreare.ponteggi.controlliPeriodici.filter(d => !d.file.value || typeof d.file.value === 'string').length === Object.entries(cantiereDaCreare.ponteggi.controlliPeriodici).length){
                    if(cantiereDaCreare.impiantoElettrico.registroControllo.filter(d => !d.file.value || typeof d.file.value === 'string').length === Object.entries(cantiereDaCreare.impiantoElettrico.registroControllo).length){
                        if(cantiereDaCreare.impiantoElettrico.verifichePeriodicheAUSL.filter(d => !d.file.value || typeof d.file.value === 'string').length === Object.entries(cantiereDaCreare.impiantoElettrico.verifichePeriodicheAUSL).length){
                            if(cantiereDaCreare.impiantoElettrico.registroControllo.filter(d => !d.file.value || typeof d.file.value === 'string').length === Object.entries(cantiereDaCreare.impiantoElettrico.registroControllo).length){
                                if(cantiereDaCreare.impiantoElettrico.documentiImpiantoElettrico.filter(d => !d.file.value || typeof d.file.value === 'string').length === Object.entries(cantiereDaCreare.impiantoElettrico.documentiImpiantoElettrico).length){
                                    setUploadToFauna(true)
                                }
                            }
                        }
                    }
                }
            }
        }

    }, [cantiereDaCreare, savedToS3])

    useEffect(() => {
        if(uploadToFauna){
            execQuery(createCantiereInFauna, {
                ...cantiereDaCreare,
                creatoDa: impresaSelezionata?.faunaDocumentId as string,
            }).then(res => {
                navigate(`/impresa/${impresaSelezionata?.faunaDocumentId}/cantieri`)
            })
        }
    }, [uploadToFauna])

    return (
        <>
            <div
                className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-3 text-right leading-4 font-semibold"
            >
        <span className="w-4/12 sm:w-4/12">
          Impresa esecutrice delle opere elettriche
        </span>
                <span className="text-red-600 font-bold text-2xl">*</span>
                <Select
                    className="ml-5 w-8/12 sm:w-8/12 rounded-md"
                    isDisabled={!location.state.editabile}
                    placeholder="Seleziona"
                    noOptionsMessage={() => "Imprese terminate"}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={impresa}
                    required={true}
                    value={impresaEsecutrice}
                    onChange={(e) => {
                        setImpresaEsecutrice([e] as { label: string, value: Impresa }[])
                        dispatch(setImpreseEsecutriciOpereElettricheInCantiere((e as { label: string, value: Impresa }).value))
                    }}
                />
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-3 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Preposto impresa esecutrice</span>
                {/*TODO: deve diventare una select basata sugli operai della ditta scelta nel campo precedente*/}
                <input
                    type="text"
                    disabled={!location.state.editabile}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault()
                        }
                    }}
                    className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
                    value={preposto}
                    onChange={(e) => {
                        setPreposto(e.target.value)
                        dispatch(setPrepostoImpiantoElettricoInCantiere(e.target.value))
                    }}
                />
            </div>

            <div
                className="mx-auto flex flex-row w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-3 text-right leading-4 font-semibold"
            >
                <span className="w-4/12 sm:w-4/12">Telefono</span>
                <input
                    type="number"
                    disabled={!location.state.editabile}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault()
                        }
                    }}
                    className="ml-5 input input-bordered input-sm w-8/12 sm:w-8/12"
                    value={telefonoPreposto}
                    onChange={(e) => {
                        setTelefonoPreposto(e.target.value)
                        dispatch(setTelefonoPrepostoImpiantoElettricoInCantiere(e.target.value))
                    }}
                />
            </div>

            <DocumentoImpiantoElettrico nome={"Dichiarazione di Conformità Imp. El."} label={false}/>
            <DocumentoImpiantoElettrico nome={"Relazione con tipologia materiali"} label={false}/>
            <DocumentoImpiantoElettrico nome={"Schema di impianto realizzato"} label={false}/>
            <DocumentoImpiantoElettrico nome={"Visura CCIAA"} label={false}/>

            <div
                className="mx-auto flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12
                              justify-center items-center my-4 text-right leading-4 font-semibold"
            >
                <span className="w-12/12 md:w-4/12">
                  Denuncia dell'impianto
                </span>
                        <div
                            className="w-full my-3 md:my-0 md:w-8/12 flex flex-row justify-center md:justify-between items-center">
                            <div className="w-4/12  md:w-5/12 flex flex-row justify-center items-center">
                                NO
                                <input type="checkbox" name="conformita" className="toggle mx-2"
                                       onKeyDown={(e) => {
                                           if(e.key === "Enter"){
                                               e.preventDefault()
                                           }
                                       }}
                                       checked={cantiereDaCreare.impiantoElettrico.denunciaImpianto}
                                       onChange={(e) => dispatch(setDenunciaImpiantoElettricoInCantiere(e.target.checked))}
                                />
                                SI
                            </div>
                            <div
                                className="w-6/12 md:w-7/12"
                            />
                        </div>
            </div>

            <DocumentoImpiantoElettrico nome={"Valutazione del rischio di Fulminazione."} label={true}/>
            <DocumentoImpiantoElettrico nome={"Esito"} label={false}/>

            <Nota controlliPeriodici={registroDiControllo} setControlliPeriodici={setRegistroDiControllo} label={"Redistro di Controlli"}
                  labelSubTitle={"(Mensili e semestrali)"}/>
            <Nota controlliPeriodici={verifichePeriodiche} setControlliPeriodici={setVerifichePeriodiche} label={"Verifiche periodiche (AUSL)"}
                  labelSubTitle={"(Trascorsi 2 anni dalla messa in esercizio)"}/>

            {location.state.editabile && !location.state.modifica &&
                <div className="flex mt-8 mb-6 mx-auto w-60">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button
                        type="submit"
                        className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                        onClick={() => {
                            dispatch(setRegistroControlliImpiantoElettricoInCantiere(registroDiControllo))
                            dispatch(setVerifichePeriodicheImpiantoElettricoInCantiere(verifichePeriodiche))
                            setUploadToS3(true)
                        }}
                    >
                        Crea Cantiere
                    </button>
                </div>
            }
            {location.state.editabile && location.state.modifica &&
                <div className="flex mt-8 mb-6 mx-auto w-60">
                    <div className="rounded-bl rounded-tl bg-amber-600 p-2">
                        <TfiSave size="30px" className="text-white"/>
                    </div>
                    <button
                        type="submit"
                        className="rounded-br rounded-tr bg-amber-400 p-2 w-full text-white hover:cursor-pointer font-bold"
                        onClick={() => {
                            dispatch(setRegistroControlliImpiantoElettricoInCantiere(registroDiControllo))
                            dispatch(setVerifichePeriodicheImpiantoElettricoInCantiere(verifichePeriodiche))
                            setUploadToS3(true)
                        }}
                    >
                        Modifica Cantiere
                    </button>
                </div>
            }
        </>
    );
};
export default ElettricoCantieriTab;
