import { ISearchBy } from '../../interfaces/search'
import { IFilterBy } from '../../interfaces/filter'
import { StayAction } from './stay.reducer'
import { stayService } from '../../services/stay.service'
import { store } from '../store'

export async function loadStays(
    pageIdx: number = 0,
    searchBy?: ISearchBy,
    filterBy?: IFilterBy,
    append: boolean = false
) {
    store.dispatch<StayAction>({ type: 'SET_IS_LOADING', isLoading: true })
    try {
        const { totalPages } = store.getState().stayModule
        if (append && totalPages && pageIdx >= totalPages) return
        const data = (await stayService.loadStays(searchBy, filterBy, pageIdx)) || []
        const actionType = append ? 'LOAD_MORE_STAYS' : 'SET_STAYS'
        if (!append) store.dispatch<StayAction>({ type: 'SET_TOTAL_PAGES', totalPages: data.totalPages })
        store.dispatch<StayAction>({ type: actionType, stays: data.stays })
    } catch (err) {
        console.log('StayActions: Had issues loading stays', err)
        throw err
    } finally {
        store.dispatch<StayAction>({ type: 'SET_IS_LOADING', isLoading: false })
    }
}
