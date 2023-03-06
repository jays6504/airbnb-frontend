import { IAction } from '../interfaces/store'

export interface ISystemState {
    isLoading: boolean
}

const initialState: ISystemState = {
    isLoading: false,
}

export function systemReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case 'LOADING_START':
            return { ...state, isLoading: true }
        case 'LOADING_DONE':
            return { ...state, isLoading: false }
        default:
            return state
    }
}
