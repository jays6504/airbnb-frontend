import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StayList } from './cmps/stay-list'
import { StayMap } from './cmps/stay-map'
import { IStayPreview } from '../../interfaces/stay'
import { FaMap } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa'
import { loadStays } from '../../store/stay/stay.actions'
import { RootState } from '../../store/store'
import { FilterSlider } from './cmps/filter-slider'
import { stayService } from '../../services/stay.service'
import { IFilter } from '../../interfaces/filter'
import { utilService } from '../../services/util.service'
import { FilterButton } from './cmps/filter-button'
import { useLocation } from 'react-router-dom'
import { ISearchBy } from '../../interfaces/search'

interface IChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
}

const STAYS_INCREMENT_BY = 20

export function Home() {
    const stays = useSelector((storeState: RootState) => storeState.stayModule.stays)
    const isLoading = useSelector((storeState: RootState) => storeState.stayModule.isLoading)
    const [filters, setFilters] = useState<IFilter[]>([])
    const [isMapView, setIsMapView] = useState<boolean>(false)

    useEffect(() => {
        loadStays()
        loadFilters()
    }, [])

    const location = useLocation()
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        let paramsObj = Object.fromEntries(searchParams.entries())
        let searchObj: ISearchBy = {
            adults: +paramsObj.adults,
            children: +paramsObj.children,
            destination: paramsObj.destination,
            endDate: utilService.deformatDate(paramsObj.endDate),
            startDate: utilService.deformatDate(paramsObj.startDate),
            infants: +paramsObj.infants,
            pets: +paramsObj.pets,
            guests: +paramsObj.guests,
        }
        if (searchObj.destination === "I'm Flexible") searchObj.destination = ''
        loadStays(searchObj)
    }, [location])

    function loadFilters(): void {
        let filters: IFilter[] = stayService.loadFilters()
        filters.forEach(f => (f._id = utilService.makeId()))
        setFilters(filters)
    }

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

    function onFilterChange(label: string) {
        //TODO : dispatch action to make store changes in searchBy
        console.log('label:', label)
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
            <div className='filters main-layout'>
                <div className='wrapper'>
                    <FilterSlider filters={filters} onFilterChange={onFilterChange} />
                    <FilterButton />
                </div>
            </div>

            <section className='stay-index main-layout'>
                {!isMapView ? <StayList {...childProps} /> : <StayMap {...childProps} />}
                <button onClick={toggleMapView} className='view-toggle-btn'>
                    {viewToggleBtn()}
                </button>
            </section>
        </div>
    )
}
