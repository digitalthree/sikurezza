import React from 'react';
import {Gru, gruDefault} from "../../model/Gru";
import {useDispatch} from "react-redux";
import {useFaunaQuery} from "../../faunadb/hooks/useFaunaQuery";
import {removeGru, setGruDaCreare, setGruSelezionata} from "../../store/gruSlice";
import {deleteGruFromFauna} from "../../faunadb/api/gruAPIs";
import {deleteFileS3} from "../../aws/s3APIs";

export interface EditButtonGruProps{
    gruTarget: Gru;
    setEditabile: (v: boolean) => void;
    setModifica: (v: boolean) => void;
}

const EditButtonGru: React.FC<EditButtonGruProps> = ({gruTarget, setEditabile, setModifica}) => {
    const dispatch = useDispatch();
    const { execQuery } = useFaunaQuery();

    return (
        <>
            <div className="text-right">
                <label
                    htmlFor="my-modal-5"
                    className="mr-4"
                    onClick={() => {
                        dispatch(setGruSelezionata(gruTarget));
                        setEditabile(false);
                    }}
                >
                    apri
                </label>
                {/* Icona ingranaggio */}

                <div className="tooltip tooltip-left tooltip-info" data-tip="Opzioni">
                    <button className="btn btn-link btn-xs hover:bg-sky-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17.736"
                            height="18.389"
                            viewBox="0 0 17.736 18.389"
                        >
                            <path
                                d="M123.346,35.374c.037.277.081.6.123.883a1.66,1.66,0,0,0,1.152,1.36l.148.052a1.664,1.664,0,0,0,1.738-.426h0c.2-.207.419-.439.612-.637l0,0a.436.436,0,0,1,.555-.063c.2.134.4.277.59.426a.437.437,0,0,1,.111.549h0c-.132.246-.285.529-.42.786a1.66,1.66,0,0,0,.133,1.777l.089.129a1.665,1.665,0,0,0,1.657.677c.282-.052.6-.109.87-.157h0a.436.436,0,0,1,.486.275c.084.228.159.458.227.691a.437.437,0,0,1-.233.51c-.252.121-.543.26-.8.389a1.661,1.661,0,0,0-.937,1.516l0,.157a1.663,1.663,0,0,0,.943,1.52c.259.124.547.263.8.385h0a.436.436,0,0,1,.231.509c-.066.233-.141.464-.222.693a.439.439,0,0,1-.488.275h0c-.274-.05-.592-.108-.877-.156a1.659,1.659,0,0,0-1.649.675l-.095.125a1.664,1.664,0,0,0-.131,1.785h0c.136.253.288.534.417.779l0,0a.436.436,0,0,1-.112.547c-.191.15-.387.293-.588.43a.438.438,0,0,1-.556-.064h0c-.193-.2-.415-.435-.618-.642a1.661,1.661,0,0,0-1.731-.423l-.15.046a1.662,1.662,0,0,0-1.155,1.366c-.039.285-.081.6-.12.876a.007.007,0,0,1,0,0,.436.436,0,0,1-.412.377c-.243.01-.485.009-.728,0a.437.437,0,0,1-.412-.379c-.037-.277-.081-.6-.123-.883a1.66,1.66,0,0,0-1.152-1.36l-.148-.052a1.664,1.664,0,0,0-1.738.426h0c-.2.207-.419.439-.612.637l0,0a.436.436,0,0,1-.555.063c-.2-.134-.4-.277-.59-.426a.437.437,0,0,1-.111-.549h0c.132-.246.285-.529.42-.786a1.66,1.66,0,0,0-.133-1.777l-.089-.129a1.665,1.665,0,0,0-1.657-.677c-.282.052-.6.109-.87.157h0a.436.436,0,0,1-.486-.275c-.084-.228-.159-.458-.227-.691a.437.437,0,0,1,.233-.51c.252-.121.543-.26.8-.389a1.661,1.661,0,0,0,.937-1.516l0-.157a1.663,1.663,0,0,0-.943-1.52c-.259-.124-.547-.263-.8-.385h0a.436.436,0,0,1-.231-.509c.066-.233.141-.464.222-.693a.439.439,0,0,1,.488-.275h0c.274.05.592.108.877.156a1.659,1.659,0,0,0,1.649-.675l.095-.125a1.664,1.664,0,0,0,.131-1.785h0c-.136-.253-.288-.534-.417-.779l0,0a.436.436,0,0,1,.112-.547c.191-.15.387-.293.588-.43a.438.438,0,0,1,.556.064h0c.193.2.415.435.618.642a1.661,1.661,0,0,0,1.731.423l.15-.046a1.662,1.662,0,0,0,1.155-1.366c.039-.285.081-.6.12-.876a.007.007,0,0,1,0,0,.436.436,0,0,1,.412-.377c.243-.01.485-.009.728,0A.437.437,0,0,1,123.346,35.374Zm-.777,4.87a3.94,3.94,0,1,1-3.94,3.94A3.942,3.942,0,0,1,122.569,40.244Z"
                                transform="translate(-113.701 -34.99)"
                                fill="#cfcfcf"
                                fill-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Icona chiave inglese */}
                <div className="tooltip tooltip-left tooltip-info" data-tip="Modifica">
                    <label
                        htmlFor="my-modal-5"
                        className="btn btn-link btn-xs hover:bg-sky-500"
                        onClick={() => {
                            dispatch(setGruSelezionata(gruTarget));
                            setEditabile(true);
                            setModifica(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17.994"
                            height="18"
                            viewBox="0 0 17.994 18"
                        >
                            <path
                                d="M93.231,19.98l-8.1-6.941a4.974,4.974,0,0,0,.588-2.369A5.051,5.051,0,0,0,80.671,5.6a4.82,4.82,0,0,0-1.469.22l2.92,2.92a1.13,1.13,0,0,1,0,1.6L80.341,12.12a1.13,1.13,0,0,1-1.6,0L75.823,9.2a4.82,4.82,0,0,0-.22,1.469,5.068,5.068,0,0,0,7.437,4.48l6.941,8.079a1.016,1.016,0,0,0,1.524.055L93.286,21.5a1.03,1.03,0,0,0-.055-1.524Z"
                                transform="translate(-75.603 -5.602)"
                                fill="#cfcfcf"
                            />
                        </svg>
                    </label>
                </div>

                {/* Icona cestino */}
                <div
                    className="tooltip tooltip-left tooltip-info z-10"
                    data-tip="Elimina"
                >
                    <button
                        className="btn btn-link btn-xs hover:bg-sky-500"
                        onClick={() => {
                            const removeVar = dispatch(setGruSelezionata(gruTarget));
                            let messageConfirm = window.confirm(
                                "Sei sicuro di voler eliminare " + removeVar.payload?.attr.filter(a => a.nome === 'tipologia')[0].value
                            );
                            if (messageConfirm) {
                                execQuery(
                                    deleteGruFromFauna,
                                    gruTarget?.faunaDocumentId
                                ).then(() => {
                                    gruTarget?.documenti.forEach(d => {
                                        if(typeof d.file.value === 'string'){
                                            deleteFileS3(d.file.value).then(() => {})
                                        }

                                    })
                                    dispatch(
                                        removeGru(gruTarget?.faunaDocumentId as string)
                                    );
                                    dispatch(setGruSelezionata(undefined))
                                    dispatch(setGruDaCreare(gruDefault))
                                });
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14.656"
                            height="17.838"
                            viewBox="0 0 14.656 17.838"
                        >
                            <g transform="translate(-186.669 -92.401)">
                                <path
                                    d="M201.324,94.8v1.528a.3.3,0,0,1-.3.3H186.972a.3.3,0,0,1-.3-.3V94.8a.3.3,0,0,1,.3-.262h3.884V93.217c0-.3.115-.816.911-.816h4.459c.8,0,.911.513.911.816v1.319h3.884a.3.3,0,0,1,.3.262Z"
                                    fill="#cfcfcf"
                                />
                                <path
                                    d="M220.47,222.56H212.1a.89.89,0,0,1-.89-.89L210,210h12.562l-1.2,11.672a.89.89,0,0,1-.89.89Z"
                                    transform="translate(-22.287 -112.321)"
                                    fill="#cfcfcf"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditButtonGru