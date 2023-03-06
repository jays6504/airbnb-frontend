import { useState, useEffect } from 'react'
import { StayList } from './cmps/stay-list'
import { StayMap } from './cmps/stay-map'
import { IStayPreview } from '../interfaces/stay'
import { FaMap } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa'
import { stayService } from '../services/stay.service'

const stays: IStayPreview[] = []

interface ChildProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
}

export function Home() {
    const [stays, setStays] = useState([])
    // const stays = useSelector(storeState => storeState.stayModule.stays)
    // const isLoading = useSelector(storeState => storeState.stayModule.isLoading)
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isMapView, setIsMapView] = useState(false)

    useEffect(() => {}, [])

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

    // if (!stays || !stays.length) return <div>Loading...</div>
    return (
        <section className='stay-index'>
            {!isMapView ? <StayList {...childProps} /> : <StayMap {...childProps} />}
            <button onClick={toggleMapView} className='btn-toggle-view'>
                {btnToggleView()}
            </button>
        </section>
    )
}
