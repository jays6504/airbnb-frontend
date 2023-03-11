import { useState, useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { StayList } from './cmps/stay-list'
import { StayMap } from './cmps/stay-map'
import { IStayPreview } from '../../interfaces/stay'
import { FaMap } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa'
import { loadMoreStays, loadStays } from '../../store/stay/stay.actions'
import { RootState } from '../../store/store'
import { FilterSlider } from './cmps/filter-slider'
import { stayService } from '../../services/stay.service'
import { IFilter } from '../../interfaces/filter'
import { FilterButton } from './cmps/filter-button'
import { useLocation } from 'react-router-dom'

interface IChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
    isLoading: boolean
    STAYS_INCREMENT_BY: number
    loadMore: (pageIndex?: number) => void
}

const STAYS_INCREMENT_BY = 20

export function Home() {
    const stays = useSelector((storeState: RootState) => storeState.stayModule.stays)
    const isLoading = useSelector((storeState: RootState) => storeState.stayModule.isLoading)
    const [filters, setFilters] = useState<IFilter[]>(stayService.loadFilters())
    const [isMapView, setIsMapView] = useState<boolean>(false)

    const location = useLocation()
    useLayoutEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.toString() !== '') return
        loadStays()
    }, [])

    function onAddToWishlist(): void {
        console.log('Todo:add to wishlist')
    }

    function loadMore(pageIndex = 0) {
        if (isLoading) return
        loadMoreStays(pageIndex)
    }

    const childProps: IChildProps = {
        stays,
        onAddToWishlist,
        isMapView,
        isLoading,
        STAYS_INCREMENT_BY,
        loadMore,
    }

    function toggleMapView() {
        setIsMapView(prev => !prev)
    }

    function onFilterChange(label: string) {
        console.log('label:', label)
    }

    return (
        <div className='home'>
            <div className='filters main-layout'>
                <div className='wrapper'>
                    <FilterSlider filters={filters} onFilterChange={onFilterChange} />
                    <FilterButton />
                </div>
            </div>

            <section className='stay-index main-layout'>
                {!isMapView ? <StayList {...childProps} /> : <StayMap {...childProps} />}
                <button onClick={toggleMapView} className='view-toggle-btn'>
                    {viewToggleBtn(isMapView)}
                </button>
            </section>
        </div>
    )
}

const viewToggleBtn = (isMapView: boolean): JSX.Element => {
    let title = isMapView ? 'Show List' : 'Show Map'
    return (
        <>
            <span>{title}</span>
            {isMapView ? <FaListUl /> : <FaMap />}
        </>
    )
}
