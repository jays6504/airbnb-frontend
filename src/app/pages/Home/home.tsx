import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaMap, FaListUl } from 'react-icons/fa'

import { RootState } from '../../store/store'
import { IStayPreview } from '../../interfaces/stay'
import { IFilter, IFilterBy } from '../../interfaces/filter'
import { loadStays } from '../../store/stay/stay.actions'
import { stayService } from '../../services/stay.service'
import { StayList } from './cmps/stay-list'
import { StayMap } from './cmps/Map/stay-map'
import { FilterButton } from './cmps/filter-button'
import { FilterSlider } from './cmps/filter-slider'
import { ISearchBy } from '../../interfaces/search'
interface IChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
    isLoading: boolean
    STAYS_INCREMENT_BY: number
    loadMoreStays: (pageIndex?: number) => void
    onStayClick: (stayId: string) => void
    totalPages: number | null
}

const STAYS_INCREMENT_BY = 20

export function Home() {
    const { stays, isLoading, totalPages } = useSelector((storeState: RootState) => storeState.stayModule)
    const [filters, setFilters] = useState<IFilter[]>([])
    const [isMapView, setIsMapView] = useState<boolean>(false)
    const [searchBy, setSearchBy] = useState<ISearchBy>(stayService.getDefaultSearch())
    const [filterBy, setFilterBy] = useState<IFilterBy>(stayService.getDefaultFilter())
    const location = useLocation()
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(location.search)
    useEffect(() => {
        if (searchParams.toString() !== '') return
        fetchFilters()
        loadStays()
    }, [])

    useEffect(() => {
        if (searchParams.toString() === '') return
        const paramsObj = Object.fromEntries(searchParams.entries())
        loadStaysFromSearchParams(paramsObj)
        fetchFilters()
    }, [location.search])

    async function fetchFilters() {
        try {
            const filters = await stayService.loadFilters()
            if (!filters) throw new Error('Couldnt load filters')
            setFilters(filters)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function loadStaysFromSearchParams(params: Record<string, string>) {
        const searchObj = stayService.getSearchFromParams(params)
        setSearchBy(searchObj)
        loadStays(0, searchObj)
    }

    function onStayClick(stayId: string) {
        const searchParams = new URLSearchParams(location.search)
        navigate(`/stay/${stayId}?${searchParams}`)
    }

    function onAddToWishlist(): void {
        console.log('Todo:add to wishlist')
    }
    console.log('totalPages,stays:', totalPages, stays)
    function loadMoreStays(pageIndex = 0) {
        if (!totalPages || (totalPages && pageIndex >= totalPages)) return
        if (isLoading) return
        loadStays(pageIndex, searchBy, filterBy, true)
    }

    const childProps: IChildProps = {
        stays,
        onAddToWishlist,
        isMapView,
        isLoading,
        STAYS_INCREMENT_BY,
        loadMoreStays,
        onStayClick,
        totalPages,
    }

    function toggleMapView() {
        setIsMapView(prev => !prev)
    }

    function onFilterWidgetClick(label: string) {
        loadStays(0, searchBy, { ...filterBy, labels: [label] })
        setFilterBy(prev => ({ ...prev, labels: [label] }))
    }

    return (
        <div className='home'>
            <div className='filters main-layout'>
                <div className='wrapper'>
                    <FilterSlider filterBy={filterBy} filters={filters} onFilterChange={onFilterWidgetClick} />
                    <FilterButton />
                </div>
            </div>

            <section className='stay-index'>
                {!isMapView ? <StayList {...childProps} /> : <StayMap {...childProps} />}
                <button onClick={toggleMapView} className='view-toggle-btn'>
                    {viewToggleBtn(isMapView)}
                </button>
            </section>
            <div className='home-footer main-layout'>
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
