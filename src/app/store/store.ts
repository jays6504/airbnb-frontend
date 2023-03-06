import { combineReducers, legacy_createStore, compose } from 'redux'

import { ISystemState, systemReducer } from './system.reducer'
import { IStayState, stayReducer } from './stay/stay.reducer'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
export interface RootState {
    systemModule: ISystemState
    stayModule: IStayState
}

const rootReducer = combineReducers({
    systemModule: systemReducer,
    stayModule: stayReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : undefined

export const store = legacy_createStore(rootReducer, middleware)
