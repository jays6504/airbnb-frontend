import { ISearchBy } from '../../interfaces/search'
import { IStayPreview } from '../../interfaces/stay'

// Stay state:
export interface IStayState {
    stays: IStayPreview[]
    isLoading: boolean
}

export type StayAction =
    | { type: 'SET_STAYS'; stays: IStayPreview[] }
    | { type: 'LOAD_MORE_STAYS'; stays: IStayPreview[] }
    | { type: 'SET_IS_LOADING'; isLoading: boolean }
    | { type: 'SET_FILTER'; searchBy: ISearchBy }

const initialState: IStayState = {
    stays: [],
    isLoading: false,
}

export function stayReducer(state = initialState, action: StayAction) {
    // {type: SOME_TYPE, data}
    let stays: IStayPreview[] | [] = []

    switch (action.type) {
        // Stays
        case 'SET_STAYS':
            return { ...state, stays: action.stays }
        case 'LOAD_MORE_STAYS':
            return { ...state, stays: [...state.stays, ...action.stays] }
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.isLoading }

        //   Defalut
        default:
            return { ...state }
    }
}
