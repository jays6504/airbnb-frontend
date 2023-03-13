import { useState, useLayoutEffect, useRef, useEffect } from 'react'
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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

interface IChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
    isLoading: boolean
    STAYS_INCREMENT_BY: number
    loadMore: (pageIndex?: number) => void
    onStayClick: (stayId: string) => void
}

const STAYS_INCREMENT_BY = 20

export function Home() {
    const stays = useSelector((storeState: RootState) => storeState.stayModule.stays)
    const isLoading = useSelector((storeState: RootState) => storeState.stayModule.isLoading)
    const [filters, setFilters] = useState<IFilter[]>(stayService.loadFilters())
    const [isMapView, setIsMapView] = useState<boolean>(false)

    const location = useLocation()
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    useLayoutEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.toString() !== '') return
        loadStays()
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.toString() === '') return
        let paramsObj = Object.fromEntries(searchParams.entries())
        let searchObj = stayService.getSearchFromParams(paramsObj)
        loadStays(searchObj)
    }, [searchParams])

    function onStayClick(stayId: string) {
        const searchParams = new URLSearchParams(location.search)
        navigate(`/stay/${stayId}?${searchParams}`)
    }

    function onAddToWishlist(): void {
        console.log('Todo:add to wishlist')
    }

    function loadMore(pageIndex = 0) {
        if (isLoading) return
        console.log('pageIndex:', pageIndex)
        loadMoreStays(pageIndex)
    }

    const childProps: IChildProps = {
        stays,
        onAddToWishlist,
        isMapView,
        isLoading,
        STAYS_INCREMENT_BY,
        loadMore,
        onStayClick,
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
            <div className='home-footer'>
                <span>
                    ©2023 Airbnb clone created by <a href='https://github.com/Boydem/airbnb-frontend'>Noam Dahan</a>
                </span>
            </div>
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
