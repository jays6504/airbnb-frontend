import { ISearchBy } from '../../interfaces/search'
import { IStayPreview } from '../../interfaces/stay'

// Stay state:
export interface IStayState {
    stays: IStayPreview[]
    isLoading: boolean
    totalPages: number | null
}

export type StayAction =
    | { type: 'SET_STAYS'; stays: IStayPreview[] }
    | { type: 'LOAD_MORE_STAYS'; stays: IStayPreview[] }
    | { type: 'SET_IS_LOADING'; isLoading: boolean }
    | { type: 'SET_FILTER'; searchBy: ISearchBy }
    | { type: 'SET_TOTAL_PAGES'; totalPages: number }

const initialState: IStayState = {
    stays: [],
    isLoading: false,
    totalPages: null,
}

export function stayReducer(state = initialState, action: StayAction) {
    // {type: SOME_TYPE, data}

    switch (action.type) {
        // Stays
        case 'SET_STAYS':
            return { ...state, stays: action.stays }
        case 'LOAD_MORE_STAYS':
            return { ...state, stays: [...state.stays, ...action.stays] }
        case 'SET_TOTAL_PAGES':
            return { ...state, totalPages: action.totalPages }
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.isLoading }

        //   Defalut
        default:
            return { ...state }
    }
}
