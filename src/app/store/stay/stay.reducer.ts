import { ISearchBy } from '../../interfaces/search'
import { IStayPreview } from '../../interfaces/stay'
import { stayService } from '../../services/stay.service'

// Stay state:
export interface IStayState {
    stays: IStayPreview[]
    // searchBy: ISearchBy
    isLoading: boolean
}

export type StayAction =
    | { type: 'SET_STAYS'; stays: IStayPreview[] }
    | { type: 'SET_IS_LOADING'; isLoading: boolean }
    | { type: 'SET_FILTER'; searchBy: ISearchBy }

const initialState: IStayState = {
    stays: [],
    // searchBy: stayService.getDefaultSearch(),
    isLoading: false,
}

export function stayReducer(state = initialState, action: StayAction) {
    // {type: SOME_TYPE, data}
    let stays: IStayPreview[] | [] = []

    switch (action.type) {
        // Stays
        case 'SET_STAYS':
            return { ...state, stays: action.stays }
        // case 'SET_FILTER':
        //     return { ...state, searchBy: action.searchBy }
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.isLoading }

        //   Defalut
        default:
            return { ...state }
    }
}
