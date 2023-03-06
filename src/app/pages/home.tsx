import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StayList } from './cmps/stay-list'
import { StayMap } from './cmps/stay-map'
import { IStayPreview } from '../interfaces/stay'
import { FaMap } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa'
import { loadStays } from '../store/stay/stay.actions'
import { RootState } from '../store/store'

interface ChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
}

export function Home() {
    const stays = useSelector((storeState: RootState) => storeState.stayModule.stays)
    const isLoading = useSelector((storeState: RootState) => storeState.stayModule.isLoading)
    const filterBy = useSelector((storeState: RootState) => storeState.stayModule.filterBy)
    const [isMapView, setIsMapView] = useState(false)

    useEffect(() => {
        loadStays(filterBy, 20)
    }, [])

    function onAddToWishlist(): void {
        console.log('Todo:add to wishlist')
    }

    const childProps: ChildProps = {
        stays: stays,
        onAddToWishlist,
    }

    function toggleMapView() {
        setIsMapView(prev => !prev)
    }

    const btnToggleView = (): JSX.Element => {
        let title = isMapView ? 'Show List' : 'Show Map'
        return (
            <span className='flex align-center'>
                {title}
                {isMapView ? <FaListUl /> : <FaMap />}
            </span>
        )
    }

    if (isLoading) return <div>Loading HOME...</div>
    return (
        <section className='stay-index'>
            {!isMapView ? <StayList {...childProps} /> : <StayMap {...childProps} />}
            <button onClick={toggleMapView} className='btn-toggle-view'>
                {btnToggleView()}
            </button>
        </section>
    )
}
