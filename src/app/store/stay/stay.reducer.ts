import { IFilterBy } from '../../interfaces/filter'
import { IStayPreview } from '../../interfaces/stay'
import { stayService } from '../../services/stay.service'

// Stay state:
export interface IStayState {
    stays: IStayPreview[]
    filterBy: IFilterBy
    isLoading: boolean
}

export type StayAction =
    | { type: 'SET_STAYS'; stays: IStayPreview[] }
    | { type: 'SET_IS_LOADING'; isLoading: boolean }
    | { type: 'SET_FILTER'; filterBy: IFilterBy }

const initialState: IStayState = {
    stays: [],
    filterBy: stayService.getDefaultFilter(),
    isLoading: false,
}

export function stayReducer(state = initialState, action: StayAction) {
    // {type: SOME_TYPE, data}
    let stays: IStayPreview[] | [] = []

    switch (action.type) {
        // Stays
        case 'SET_STAYS':
            return { ...state, stays: action.stays }
        case 'SET_IS_LOADING':
            console.log('state:', state)
            return { ...state, isLoading: action.isLoading }

        //   Defalut
        default:
            return { ...state }
    }
}
