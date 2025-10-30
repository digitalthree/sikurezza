import React, {useEffect, useState} from 'react';
import {SearchComponent} from "../../shared/slectComponent/SearchComponent";
import {useDispatch, useSelector} from "react-redux";
import {ImpreseSelector, setImpresaSelezionata} from "../../store/impresaSlice";
import {
    addItem,
    resetItem,
    setRicerca,
    TotalControlItemsSelector, TotalControlRicercaByGruSelector,
    TotalControlRicercaByImpresaSelector,
    TotalControlRicercaByMacchinaEAttrezzaturaSelector,
    TotalControlRicercaByMaestranzaSelector, TotalControlRicercaByPonteggioSelector
} from "../../store/totalControlSlice";
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
import CreazioneMaestranzaModale from "../mirkoComponents/modal/CreazioneMaestranzaModale";
import { useDynamoDBQuery } from '../../dynamodb/hook/useDynamoDBQuery';
import { getAllMacchineEAttrezzatureByCreatoDa } from '../../dynamodb/api/macchinaEAttrezzaturaAPIs';
import { getAllMaestranzeByCreatoDa } from '../../dynamodb/api/maestranzaAPIs';
import { getAllPonteggiByCreatoDa } from '../../dynamodb/api/ponteggioAPIs';
import { getAllGruByCreatoDa } from '../../dynamodb/api/gruAPIs';
import { convertFromDynamoDBFormat } from '../../dynamodb/utils/conversionFunctions';

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
    const {execQuery2} = useDynamoDBQuery()

    const [modifica, setModifica] = useState(true)

    const [itemsFiltered, setItemFiltered] = useState<{item: Impresa | MacchinaEAttrezzatura | Maestranza | Ponteggio | Gru, tipo: "Impresa" | "Maestranza" | "MacchinaEAttrezzatura" | "Ponteggio" | "Gru", scadenza: string, problema: string}[]>([])

    useEffect(() => {
        dispatch(resetItem())
        imprese.forEach(i => {
            execQuery2(getAllMacchineEAttrezzatureByCreatoDa, i.id).then((res) => {
                res.Items.forEach((item:any) => {
                    let r = convertFromDynamoDBFormat(item) as MacchinaEAttrezzatura;
                    if (r && (Date.parse(r.ultimaRevisione.scadenza) - Date.now() < 45*24*3600*1000)) {
                            dispatch(addItem({item: r, tipo: "MacchinaEAttrezzatura", scadenza: r.ultimaRevisione.scadenza, problema: "Ultima Revisione"}))

                    }
                })
            })
            execQuery2(getAllMaestranzeByCreatoDa, i.id).then((res) => {
                res.Items.forEach((item:any) => {
                    let maestranza = convertFromDynamoDBFormat(item) as Maestranza;
                    if (maestranza) {
                        maestranza.documenti.forEach(d => {
                            if((Date.parse(d.scadenza as string) - Date.now() < 45*24*3600*1000)){
                                dispatch(addItem({item: maestranza, tipo: "Maestranza", scadenza: d.scadenza as string, problema: d.nome}))
                            }
                        })
                        maestranza.corsi.forEach(d => {
                            if((Date.parse(d.scadenza as string) - Date.now() < 45*24*3600*1000)){
                                dispatch(addItem({item: maestranza, tipo: "Maestranza", scadenza: d.scadenza as string, problema: d.nome}))
                            }
                        })
                    }
                })
            })
            execQuery2(getAllPonteggiByCreatoDa, i.id).then((res) => {
                res.Items.forEach((item:any) => {
                    let ponteggio = convertFromDynamoDBFormat(item) as Ponteggio;
                    if (ponteggio) {
                        ponteggio.controlli.forEach(c => {
                            if((Date.parse(c.data) - Date.now() < 45*24*3600*1000)){
                                dispatch(addItem({item: ponteggio, tipo: "Ponteggio", scadenza: c.data, problema: c.nome}))
                            }
                        })

                    }
                })
            })
            execQuery2(getAllGruByCreatoDa, i.id).then((res) => {
                res.Items.forEach((item:any) => {
                    let gru = convertFromDynamoDBFormat(item) as Gru;
                    if (gru) {
                        gru.verifiche.forEach(v => {
                            if((Date.parse(v.scadenza) - Date.now() < 45*24*3600*1000)){
                                dispatch(addItem({item: gru, tipo: "Gru", scadenza: v.scadenza, problema: v.label}))
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
                    if ((i.item as (Maestranza|MacchinaEAttrezzatura|Ponteggio|Gru)).creatoDa
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
                <div className="overflow-x-auto overflow-y-hidden w-1/2 border-t-zinc-300 border rounded-xl mt-20">
                    <table className="table table-zebra w-full ">
                        <tbody>
                        {/* row 1 */}
                        {itemsFiltered.map((i, index) => {
                            if (i.tipo === "MacchinaEAttrezzatura") {
                                return (
                                    <tr key={(i.item as MacchinaEAttrezzatura).id}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as MacchinaEAttrezzatura).creatoDa}</td>
                                        <td>{(i.item as MacchinaEAttrezzatura).attr.filter(a => a.nome === "denominazione")[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30}
                                                             color={`${Date.parse(i.scadenza) - Date.now() < 30 * 24 * 3600 * 1000 ? 'red' : 'orange'}`}/>
                                        </td>
                                        <td><label className="hover:cursor-pointer hover:underline hover:text-black"
                                                   htmlFor="my-modal-7"
                                                   onClick={() => {
                                                       dispatch(setImpresaSelezionata(imprese.filter(im => im.id === (i.item as MacchinaEAttrezzatura).creatoDa)[0]))
                                                       dispatch(setMacchinaEAttrezzaturaSelezionato(i.item as MacchinaEAttrezzatura));
                                                   }}
                                        >apri</label></td>
                                    </tr>
                                )
                            }
                            if (i.tipo === "Maestranza") {
                                return (
                                    <tr key={(i.item as Maestranza).id}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as Maestranza).creatoDa}</td>
                                        <td>{(i.item as Maestranza).anagrafica.filter(m => m.label === 'nome')[0].value} {(i.item as Maestranza).anagrafica.filter(m => m.label === 'cognome')[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30} color={`${Date.parse(i.scadenza) - Date.now() < 30 * 24 * 3600 * 1000 ? 'red' : 'orange'}`}/>
                                        </td>
                                        <td><label
                                            htmlFor="my-modal-8"
                                            className="mr-4"
                                            onClick={() => {
                                                dispatch(setImpresaSelezionata(imprese.filter(im => im.id === (i.item as Maestranza).creatoDa)[0]))
                                                dispatch(setMaestranzaSelezionata(i.item as Maestranza));
                                            }}
                                        >apri</label>
                                        </td>
                                    </tr>
                                )
                            }
                            if (i.tipo === "Ponteggio") {
                                return (
                                    <tr key={(i.item as Ponteggio).id}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as Ponteggio).creatoDa}</td>
                                        <td>{(i.item as Ponteggio).attr.filter(a => a.nome === "tipologia")[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30} color={`${Date.parse(i.scadenza) - Date.now() < 30 * 24 * 3600 * 1000 ? 'red' : 'orange'}`}/>
                                        </td>
                                        <td><label
                                            htmlFor="my-modal-6"
                                            className="mr-4"
                                            onClick={() => {
                                                dispatch(setImpresaSelezionata(imprese.filter(im => im.id === (i.item as Ponteggio).creatoDa)[0]))
                                                dispatch(setPonteggioSelezionato(i.item as Ponteggio));
                                            }}
                                        >apri</label>
                                        </td>
                                    </tr>
                                )
                            }
                            if (i.tipo === "Gru") {
                                return (
                                    <tr key={(i.item as Gru).id}
                                        className="link link-hover hover:text-sky-500">
                                        <th>{index + 1}</th>
                                        <td>{(i.item as Gru).creatoDa}</td>
                                        <td>{(i.item as Gru).attr.filter(a => a.nome === "tipologia")[0].value}</td>
                                        <td>{i.problema}</td>
                                        <td>
                                            <FiAlertTriangle size={30} color={`${Date.parse(i.scadenza) - Date.now() < 30 * 24 * 3600 * 1000 ? 'red' : 'orange'}`}/>
                                        </td>
                                        <td><label
                                            htmlFor="my-modal-5"
                                            className="mr-4"
                                            onClick={() => {
                                                dispatch(setImpresaSelezionata(imprese.filter(im => im.id === (i.item as Gru).creatoDa)[0]))
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
            <CreazioneMacchinaEAttrezzatura editabile={true} modifica={true} setModifica={setModifica}/>
            <CreazionePonteggio editabile={true} modifica={true} setModifica={setModifica}/>
            <CreazioneGru editabile={true} modifica={true} setModifica={setModifica}/>
            <CreazioneMaestranzaModale editabile={true} modifica={true}/>
        </>
    )
}

export default TotalControl