import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {CantiereSlice} from "./cantiereSlice"
import {ImpresaSlice} from "./impresaSlice";
import {MaestranzaSlice} from "./maestranzaSlice";
import {EstintoreSlice} from "./estintoreSlice";
import {GruSlice} from "./gruSlice";
import {PonteggioSlice} from "./ponteggioSlice";
import {MacchinaEAttrezzaturaSlice} from "./macchinaEAttrezzaturaSlice";

const rootReducer = combineReducers({
    cantiereSlice: CantiereSlice.reducer,
    impresaSlice: ImpresaSlice.reducer,
    maestranzaSlice: MaestranzaSlice.reducer,
    estintoreSlice: EstintoreSlice.reducer,
    gruSlice: GruSlice.reducer,
    ponteggioSlice: PonteggioSlice.reducer,
    macchinaEAttrezzaturaSlice: MacchinaEAttrezzaturaSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
