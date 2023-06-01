import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {CantiereSlice} from "./cantiereSlice"
import {ImpresaSlice} from "./impresaSlice";
import {MaestranzaSlice} from "./maestranzaSlice";
import {EstintoreSlice} from "./estintoreSlice";
import {GruSlice} from "./gruSlice";
import {PonteggioSlice} from "./ponteggioSlice";
import {MacchinaEAttrezzaturaSlice} from "./macchinaEAttrezzaturaSlice";
import {TotalControlSlice} from "./totalControlSlice";
import * as localforage from "localforage";
import { persistReducer } from 'redux-persist'
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    cantiereSlice: CantiereSlice.reducer,
    impresaSlice: ImpresaSlice.reducer,
    maestranzaSlice: MaestranzaSlice.reducer,
    estintoreSlice: EstintoreSlice.reducer,
    gruSlice: GruSlice.reducer,
    ponteggioSlice: PonteggioSlice.reducer,
    macchinaEAttrezzaturaSlice: MacchinaEAttrezzaturaSlice.reducer,
    totalControlSlice: TotalControlSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage: localforage,
    whitelist: ['impresaSlice']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
