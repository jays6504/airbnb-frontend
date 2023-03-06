import { IFilterBy } from '../../interfaces/filter'
import { StayAction } from './stay.reducer'
import { stayService } from '../../services/stay.service'
import { store } from '../store'

export async function loadStays(filterBy: IFilterBy, amountToDisplay: number) {
    // TODO : ADD IS LOADING DISPATCHES
    store.dispatch<StayAction>({ type: 'SET_IS_LOADING', isLoading: true })
    try {
        const stays = (await stayService.query(filterBy, amountToDisplay)) || []
        store.dispatch<StayAction>({ type: 'SET_STAYS', stays })
    } catch (err) {
        console.log('StayActions: Had issues loading stays', err)
        throw err
    } finally {
        store.dispatch<StayAction>({ type: 'SET_IS_LOADING', isLoading: false })
    }
}
