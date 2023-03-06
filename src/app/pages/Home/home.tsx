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

interface IChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
}

const STAYS_INCREMENT_BY = 20

export function Home() {
    const stays = useSelector((storeState: RootState) => storeState.stayModule.stays)
    const isLoading = useSelector((storeState: RootState) => storeState.stayModule.isLoading)
    const filterBy = useSelector((storeState: RootState) => storeState.stayModule.filterBy)
    const [filters, setFilters] = useState<IFilter[]>([])
    const [isMapView, setIsMapView] = useState<boolean>(false)

    useEffect(() => {
        loadStays(filterBy, STAYS_INCREMENT_BY)
        loadFilters()
    }, [])

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
