import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    BreadcrumbItemsSelector,
    ImpresaSelezionataSelector,
    setImpresaSelezionata, setObjectToCreate,
} from "../../store/impresaSlice";
import {useNavigate} from "react-router-dom";
import {setMaestranzaSelezionata} from "../../store/maestranzaSlice";

interface BreadcrumbProps {}

export const Breadcrumb: React.FC<BreadcrumbProps> = () => {
    const dispatch = useDispatch();
    const impresaSelezionata = useSelector(ImpresaSelezionataSelector);
    const navigate = useNavigate();
    const breadcrumbsItems = useSelector(BreadcrumbItemsSelector)

    return (
        <div className="text-sm breadcrumbs mt-1 flex flex-row justify-between">
            <ul>
                {breadcrumbsItems.map((bi, index) => {
                    if (bi === "Home") {
                        return (
                            <li
                                key={bi}
                                onClick={() => {
                                    if (impresaSelezionata) {
                                        dispatch(setImpresaSelezionata(undefined));
                                        dispatch(setMaestranzaSelezionata(undefined));
                                    }
                                    dispatch(setObjectToCreate(undefined));
                                    navigate("/");
                                }}
                                className="hover:cursor-pointer"
                            >
                                {bi}
                            </li>
                        );
                    } else if (typeof bi !== "string") {
                        return (
                            <li
                                key={bi.faunaDocumentId}
                                className={`${
                                    index === breadcrumbsItems.length - 1
                                        ? "font-bold"
                                        : " hover:cursor-pointer"
                                }`}
                                onClick={() => {
                                    dispatch(setObjectToCreate(undefined));
                                    dispatch(setMaestranzaSelezionata(undefined));
                                    navigate(-1);
                                }}
                            >
                                {bi.anagrafica.attr.filter(a => a.label === 'denominazione')[0].value}
                            </li>
                        );
                    } else {
                        return (
                            <li
                                key={bi}
                                className={`${
                                    index === breadcrumbsItems.length - 1 && "font-bold"
                                }`}
                            >
                                {bi}
                            </li>
                        );
                    }
                })}
            </ul>
            <button
                className="btn btn-circle btn-sm bg-amber-400 border-0 hover:bg-amber-500"
                onClick={() => {
                    navigate(-1)
                    dispatch(setObjectToCreate(undefined));
                }}
            >
                <svg
                    viewBox="0 0 1024.00 1024.00"
                    height="70%"
                    fill="#ffffff"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    strokeWidth="58.367999999999995"
                >
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#CCCCCC"
                        strokeWidth="12.288"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                            fill=""
                        ></path>
                    </g>
                </svg>
            </button>
        </div>
    );
};
