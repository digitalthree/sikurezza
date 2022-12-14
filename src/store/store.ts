import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {CantiereSlice} from "./cantiereSlice"
import {ImpresaSlice} from "./impresaSlice";
import {MaestranzaSlice} from "./maestranzaSlice";

const rootReducer = combineReducers({
    cantiereSlice: CantiereSlice.reducer,
    impresaSlice: ImpresaSlice.reducer,
    maestranzaSlice: MaestranzaSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
