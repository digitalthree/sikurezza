import React, {useEffect, useState} from 'react';
import {SearchComponent} from "../../shared/slectComponent/SearchComponent";
import {useDispatch, useSelector} from "react-redux";
import {ImpreseSelector, setImpresaSelezionata} from "../../store/impresaSlice";
import {useFaunaQuery} from "../../faunadb/hooks/useFaunaQuery";
import {
    addItem,
    resetItem,
    setRicerca,
    TotalControlItemsSelector, TotalControlRicercaByGruSelector,
    TotalControlRicercaByImpresaSelector,
    TotalControlRicercaByMacchinaEAttrezzaturaSelector,
    TotalControlRicercaByMaestranzaSelector, TotalControlRicercaByPonteggioSelector
} from "../../store/totalControlSlice";
import {getAllMacchineEAttrezzatureByCreatoDa} from "../../faunadb/api/macchinaEAttrezzaturaAPIs";
import {getAllMaestranzeByCreatoDa} from "../../faunadb/api/maestranzaAPIs";
import {getAllPonteggiByCreatoDa} from "../../faunadb/api/ponteggioAPIs";
import {getAllGruByCreatoDa} from "../../faunadb/api/gruAPIs";
import {Impresa} from "../../model/Impresa";
import {MacchinaEAttrezzatura} from "../../model/MacchineEAttrezzature";
import {Maestranza} from "../../model/Maestranza";
import {Ponteggio} from "../../model/Ponteggio";
import {Gru} from "../../model/Gru";
import {FiAlertTriangle} from "react-icons/fi";
import CreazioneMacchinaEAttrezzatura from "../mirkoComponents/modal/CreazioneMacchinaEAttrezzatura";
import {
    MacchinaEAttrezzaturaSelector,
    setMacchinaEAttrezzaturaSelezionato
} from "../../store/macchinaEAttrezzaturaSlice";
import CreazionePonteggio from "../mirkoComponents/modal/CreazionePonteggio";
import {setPonteggioSelezionato} from "../../store/ponteggioSlice";
import CreazioneGru from "../mirkoComponents/modal/CreazioneGru";
import {setGruSelezionata} from "../../store/gruSlice";
import {setMaestranzaSelezionata} from "../../store/maestranzaSlice";
import {useNavigate} from "react-router-dom";
import CreazioneMaestranzaModale from "../mirkoComponents/modal/CreazioneMaestranzaModale";

export interface TotalControlProps {

}

const TotalControl: React.FC<TotalControlProps> = ({}) => {

    const dispatch = useDispatch()
    const imprese = useSelector(ImpreseSelector)
    const macchineEAttrezzature = useSelector(MacchinaEAttrezzaturaSelector)
    const items = useSelector(TotalControlItemsSelector)
    const ricercaByImpresa = useSelector(TotalControlRicercaByImpresaSelector)
    const ricercaByMaestranza = useSelector(TotalControlRicercaByMaestranzaSelector)
    const ricercaByMacchinaEAttrezzatura = useSelector(TotalControlRicercaByMacchinaEAttrezzaturaSelector)
    const ricercaByPonteggio = useSelector(TotalControlRicercaByPonteggioSelector)
    const ricercaByGru = useSelector(TotalControlRicercaByGruSelector)
    const {execQuery} = useFaunaQuery()
    const navigate = useNavigate()

    const [modifica, setModifica] = useState(true)

    const [itemsFiltered, setItemFiltered] = useState<{item: Impresa | MacchinaEAttrezzatura | Maestranza | Ponteggio | Gru, tipo: "Impresa" | "Maestranza" | "MacchinaEAttrezzatura" | "Ponteggio" | "Gru", problema: string}[]>([])

    useEffect(() => {
        dispatch(resetItem())
        imprese.forEach(i => {
            execQuery(getAllMacchineEAttrezzatureByCreatoDa, i.faunaDocumentId).then((res) => {
                res.forEach((r: { id: string; macchinaEAttrezzatura: MacchinaEAttrezzatura }) => {
                    if (r.macchinaEAttrezzatura && (Date.parse(r.macchinaEAttrezzatura.ultimaRevisione.scadenza) - Date.now() < 45*24*3600*1000)) {
                            dispatch(addItem({item: {
                                ...r.macchinaEAttrezzatura,
                                    faunaDocumentId: r.id,
                                }, tipo: "MacchinaEAttrezzatura", problema: "Ultima Revisione"}))

                    }
                })
            })
            execQuery(getAllMaestranzeByCreatoDa, i.faunaDocumentId).then((res) => {
                res.forEach((r: { id: string; maestranza: Maestranza }) => {
                    if (r.maestranza) {
                        r.maestranza.documenti.forEach(d => {
                            if((Date.parse(d.scadenza as string) - Date.now() < 45*24*3600*1000)){
                                dispatch(addItem({item: {...r.maestranza, faunaDocumentId: r.id}, tipo: "Maestranza", problema: d.nome}))
                            }
                        })
                    }
                })
            })
            execQuery(getAllPonteggiByCreatoDa, i.faunaDocumentId).then((res) => {
                res.forEach((r: { id: string; ponteggio: Ponteggio }) => {
                    if (r.ponteggio) {
                        r.ponteggio.controlli.forEach(c => {
                            if((Date.parse(c.data) - Date.now() < 45*24*3600*1000)){
                                dispatch(addItem({item: {...r.ponteggio, faunaDocumentId: r.id}, tipo: "Ponteggio", problema: c.nome}))
                            }
                        })

                    }
                })
            })
            execQuery(getAllGruByCreatoDa, i.faunaDocumentId).then((res) => {
                res.forEach((r: { id: string; gru: Gru }) => {
                    if (r.gru) {
                        r.gru.verifiche.forEach(v => {
                            if((Date.parse(v.scadenza) - Date.now() < 45*24*3600*1000)){
                                dispatch(addItem({item: {...r.gru, faunaDocumentId: r.id}, tipo: "Gru", problema: v.label}))
                            }
                        })
                    }
                })
            })
        })
        setModifica(true)
    }, [macchineEAttrezzature])



    useEffect(() => {
        if (ricercaByImpresa && ricercaByImpresa !== "") {
            let itemsRicerca = items.filter(i => {
                if(i.tipo !== "Impresa"){
                    if ((i.item as (Maestranza|MacchinaEAttrezzatura|Ponteggio|Gru)).creatoDa.nome.toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(ricercaByImpresa.toLowerCase().replace(/\s+/g, ''))) {
                        return i
                    }
                }else{
                    if ((i.item as Impresa).anagrafica.attr.filter(a => a.label === 'denominazione')[0].value.toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(ricercaByImpresa.toLowerCase().replace(/\s+/g, ''))) {
                        return i
                    }
                }
            })
            setItemFiltered(itemsRicerca)
        }
        else if (ricercaByMaestranza && ricercaByMaestranza !== "") {
            let itemsRicerca = items.filter(i => {
                if(i.tipo === "Maestranza"){
                    if (((i.item as Maestranza).anagrafica.filter(m => m.label === 'nome')[0].value as string).toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(ricercaByMaestranza.toLowerCase().replace(/\s+/g, '')) ||
                        ((i.item as Maestranza).anagrafica.filter(m => m.label === 'cognome')[0].value as string).toLowerCase()
                            .replace(/\s+/g, '')
                            .includes(ricercaByMaestranza.toLowerCase().replace(/\s+/g, ''))
                    ) {
                        return i
                    }
                }
            })
            setItemFiltered(itemsRicerca)
        }
        else if (ricercaByMacchinaEAttrezzatura && ricercaByMacchinaEAttrezzatura !== "") {
            let itemsRicerca = items.filter(i => {
                if(i.tipo === "MacchinaEAttrezzatura"){
                    if ((i.item as MacchinaEAttrezzatura).attr.filter(a => a.nome === "denominazione")[0].value.toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(ricercaByMacchinaEAttrezzatura.toLowerCase().replace(/\s+/g, ''))) {
                        return i
                    }
                }
            })
            setItemFiltered(itemsRicerca)
        }
        else if (ricercaByPonteggio && ricercaByPonteggio !== "") {
            let itemsRicerca = items.filter(i => {
                if(i.tipo === "Ponteggio"){
                    if (((i.item as Ponteggio).attr.filter(a => a.nome === "tipologia")[0].value as string).toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(ricercaByPonteggio.toLowerCase().replace(/\s+/g, ''))) {
                        return i
                    }
                }
            })
            setItemFiltered(itemsRicerca)
        }
        else if (ricercaByGru && ricercaByGru !== "") {
            let itemsRicerca = items.filter(i => {
                if(i.tipo === "Gru"){
                    if (((i.item as Gru).attr.filter(a => a.nome === "tipologia")[0].value as string).toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(ricercaByGru.toLowerCase().replace(/\s+/g, ''))) {
                        return i
                    }
                }
            })
            setItemFiltered(itemsRicerca)
        }
        else {
            setItemFiltered(items)
        }
    }, [ricercaByImpresa, ricercaByMaestranza, ricercaByMacchinaEAttrezzatura, ricercaByPonteggio, ricercaByGru, items])

    return (
        <>
            <div className="flex flex-col items-center w-100">
                <div className="flex-col text-2xl sm:text-3xl py-5 text-zinc-400 font-semibold underline">
                    TOTAL CONTROL
                </div>
                <div className="grid grid-cols-5 gap-10 mt-20">
                    <SearchComponent placeholder="Impresa" onChangeFunction={(ev) => {
                        dispatch(setRicerca({testo: ev.target.value, tipo: "Impresa"}))
                    }}/>
                    <SearchComponent placeholder="Maestranza" onChangeFunction={(ev) => {
                        dispatch(setRicerca({testo: ev.target.value, tipo: "Maestranza"}))
                    }}/>
                    <SearchComponent placeholder="Macchina/Attrezzatura" onChangeFunction={(ev) => {
                        dispatch(setRicerca({testo: ev.target.value, tipo: "MacchinaEAttrezzatura"}))
                    }}/>
                    <SearchComponent placeholder="Ponteggio" onChangeFunction={(ev) => {
                        dispatch(setRicerca({testo: ev.target.value, tipo: "Ponteggio"}))
                    }}/>
                    <SearchComponent placeholder="Gru" onChangeFunction={(ev) => {
                        dispatch(setRicerca({testo: ev.target.value, tipo: "Gru"}))
                    }}/>
                </div>
                <div className="overflow-x-auto overflow-y-hidden w-1/2 mt-3 border-t-zinc-300 border rounded-xl mt-20">
                    <table className="table table-zebra w-full ">
                        <tbody>
                        {/* row 1 */}
                        {itemsFiltered.map((i, index) => {
                            if (i.tipo === "MacchinaEAttrezzatura") {
                                return (
                                    <tr key={(i.item as MacchinaEAttrezzatura).faunaDocumentId}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as MacchinaEAttrezzatura).creatoDa.nome.toUpperCase()}</td>
                                        <td>{(i.item as MacchinaEAttrezzatura).attr.filter(a => a.nome === "denominazione")[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30}
                                                             color={`${Date.parse((i.item as MacchinaEAttrezzatura).ultimaRevisione.scadenza) - Date.now() < 30 * 24 * 3600 * 1000 ? 'red' : 'orange'}`}/>
                                        </td>
                                        <td><label className="hover:cursor-pointer hover:underline hover:text-black"
                                                   htmlFor="my-modal-7"
                                                   onClick={() => {
                                                       dispatch(setImpresaSelezionata(imprese.filter(im => im.faunaDocumentId === (i.item as MacchinaEAttrezzatura).creatoDa.id)[0]))
                                                       dispatch(setMacchinaEAttrezzaturaSelezionato(i.item as MacchinaEAttrezzatura));
                                                   }}
                                        >apri</label></td>
                                    </tr>
                                )
                            }
                            if (i.tipo === "Maestranza") {
                                return (
                                    <tr key={(i.item as Maestranza).faunaDocumentId}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as Maestranza).creatoDa.nome.toUpperCase()}</td>
                                        <td>{(i.item as Maestranza).anagrafica.filter(m => m.label === 'nome')[0].value} {(i.item as Maestranza).anagrafica.filter(m => m.label === 'cognome')[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30} color="red"/>
                                        </td>
                                        <td><label
                                            htmlFor="my-modal-8"
                                            className="mr-4"
                                            onClick={() => {
                                                dispatch(setImpresaSelezionata(imprese.filter(im => im.faunaDocumentId === (i.item as Maestranza).creatoDa.id)[0]))
                                                dispatch(setMaestranzaSelezionata(i.item as Maestranza));
                                            }}
                                        >apri</label>
                                        </td>
                                    </tr>
                                )
                            }
                            if (i.tipo === "Ponteggio") {
                                return (
                                    <tr key={(i.item as Ponteggio).faunaDocumentId}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as Ponteggio).creatoDa.nome.toUpperCase()}</td>
                                        <td>{(i.item as Ponteggio).attr.filter(a => a.nome === "tipologia")[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30} color="red"/>
                                        </td>
                                        <td><label
                                            htmlFor="my-modal-6"
                                            className="mr-4"
                                            onClick={() => {
                                                dispatch(setImpresaSelezionata(imprese.filter(im => im.faunaDocumentId === (i.item as Ponteggio).creatoDa.id)[0]))
                                                dispatch(setPonteggioSelezionato(i.item as Ponteggio));
                                            }}
                                        >apri</label>
                                        </td>
                                    </tr>
                                )
                            }
                            if (i.tipo === "Gru") {
                                return (
                                    <tr key={(i.item as Gru).faunaDocumentId}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as Gru).creatoDa.nome.toUpperCase()}</td>
                                        <td>{(i.item as Gru).attr.filter(a => a.nome === "tipologia")[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30} color="red"/>
                                        </td>
                                        <td><label
                                            htmlFor="my-modal-5"
                                            className="mr-4"
                                            onClick={() => {
                                                dispatch(setImpresaSelezionata(imprese.filter(im => im.faunaDocumentId === (i.item as Gru).creatoDa.id)[0]))
                                                dispatch(setGruSelezionata(i.item as Gru));
                                            }}
                                        >apri</label>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*<CreazioneMaestranzaModale/>*/}
            <CreazioneMacchinaEAttrezzatura editabile={true} modifica={modifica} setModifica={setModifica}/>
            <CreazionePonteggio editabile={true} modifica={modifica} setModifica={setModifica}/>
            <CreazioneGru editabile={true} modifica={modifica} setModifica={setModifica}/>
            <CreazioneMaestranzaModale editabile={true} modifica={modifica}/>
        </>
    )
}

export default TotalControl