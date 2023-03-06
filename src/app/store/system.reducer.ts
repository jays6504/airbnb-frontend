export interface ISystemState {
    isLoading: boolean
}

export type SystemAction =
    | { type: 'LOADING_START'; isLoading: boolean[] }
    | { type: 'LOADING_DONE'; isLoading: boolean }

const initialState: ISystemState = {
    isLoading: false,
}

export function systemReducer(state = initialState, action: SystemAction) {
    switch (action.type) {
        case 'LOADING_START':
            return { ...state, isLoading: true }
        case 'LOADING_DONE':
            return { ...state, isLoading: false }
        default:
            return state
    }
}
