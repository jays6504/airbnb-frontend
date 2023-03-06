import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StayList } from './cmps/stay-list'
import { StayMap } from './cmps/stay-map'
import { IStayPreview } from '../interfaces/stay'
import { FaMap } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa'
import { loadStays } from '../store/stay/stay.actions'
import { RootState } from '../store/store'

interface IChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
}

export function Home() {
    const stays = useSelector((storeState: RootState) => storeState.stayModule.stays)
    const isLoading = useSelector((storeState: RootState) => storeState.stayModule.isLoading)
    const filterBy = useSelector((storeState: RootState) => storeState.stayModule.filterBy)
    const [isMapView, setIsMapView] = useState<boolean>(false)

    useEffect(() => {
        loadStays(filterBy, 20)
    }, [])

    function onAddToWishlist(): void {
        console.log('Todo:add to wishlist')
    }

    const childProps: IChildProps = {
        stays: stays,
        onAddToWishlist,
        isMapView: isMapView,
    }

    function toggleMapView() {
        setIsMapView(prev => !prev)
    }

    const viewToggleBtn = (): JSX.Element => {
        let title = isMapView ? 'Show List' : 'Show Map'
        return (
            <>
                <span>{title}</span>
                {isMapView ? <FaListUl /> : <FaMap />}
            </>
        )
    }

    if (isLoading) return <div>Loading HOME...</div>
    return (
        <div className='home'>
            <section>Filters..</section>

            <section className='stay-index main-layout'>
                {!isMapView ? <StayList {...childProps} /> : <StayMap {...childProps} />}
                <button onClick={toggleMapView} className='view-toggle-btn'>
                    {viewToggleBtn()}
                </button>
            </section>
        </div>
    )
}
