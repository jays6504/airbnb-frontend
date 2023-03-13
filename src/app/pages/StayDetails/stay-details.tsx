import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ISearchBy, ISearchByOpts } from '../../interfaces/search'
import { IStay } from '../../interfaces/stay'
import { stayService } from '../../services/stay.service'
import { DetailsDatePicker } from './cmps/details-date-picker'
import { HostSection } from './cmps/host-section'
import { ImageGallery } from './cmps/image-gallery'
import { MapSection } from './cmps/map-section'
import { Reservation } from './cmps/reservation'
import { ReviewSection } from './cmps/review-section'
import { StayAmenities } from './cmps/stay-amenities'
import { StayAmenity } from './cmps/stay-amenity'
import { StayInfo } from './cmps/stay-info'
import { StayIntro } from './cmps/stay-intro'
import { StaySummary } from './cmps/stay-summary'
import { ThingsToKnowSection } from './cmps/things-to-know-section'

export function StayDetails() {
    const [stay, setStay] = useState<IStay | null>(null)
    const [activeModule, setActiveModule] = useState<string | null>(null)
    const [searchBy, setSearchBy] = useState<ISearchBy>(stayService.getDefaultSearch())
    console.log('searchBy:', searchBy)
    const { stayId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const imgsToDisplay = useMemo(() => {
        return stay?.imgUrls?.slice(0, 5)
    }, [stay?.imgUrls])

    const amenitiesToDisplay = useMemo(() => {
        return stay?.amenities?.slice(0, 10)
    }, [stay?.amenities])

    useEffect(() => {
        loadStay()
    }, [])
    // Search Params
    // let [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.toString() === '') return
        let paramsObj = Object.fromEntries(searchParams.entries())
        let searchObj = stayService.getSearchFromParams(paramsObj)
        setSearchBy(searchObj)
    }, [location])

    async function loadStay() {
        if (!stayId) return
        try {
            const stay = await stayService.get(stayId)
            stay.avgRate = stayService.calcAvgRate(stay.reviews)
            stay.avgRates = stayService.calcAvgRates(stay.reviews)
            setStay(stay)
        } catch (err) {
            navigate('/airbnb-frontend')
        }
    }

    function onSearchChange(searchOpts: ISearchByOpts) {
        setSearchBy(prev => ({ ...prev, ...searchOpts }))
    }

    function onChangeModule(moduleName: string | null) {
        if (activeModule === moduleName) return
        setActiveModule(moduleName)
    }

    console.log('stay:', stay)
    return (
        <section className='stay-details'>
            <StayIntro stay={stay} />
            <ImageGallery imgUrls={imgsToDisplay} />
            <section className='sticky-section-wrapper'>
                <main className='main-details'>
                    <StayInfo stay={stay} />
                    {stay && (
                        <>
                            <AirCover />
                            <StaySummary staySummary={stay.summary} />
                            <StayAmenities amenitiesToDisplay={amenitiesToDisplay} />
                            <DetailsDatePicker
                                searchBy={searchBy}
                                onSearchChange={onSearchChange}
                                cityName={stay?.loc.city}
                                activeModule={activeModule}
                                onChangeModule={onChangeModule}
                            />
                        </>
                    )}
                </main>
                {stay ? (
                    <Reservation
                        stay={stay}
                        searchBy={searchBy}
                        onChangeModule={onChangeModule}
                        activeModule={activeModule}
                        onSearchChange={onSearchChange}
                    />
                ) : (
                    <div className='reservation skeleton'></div>
                )}
            </section>
            {stay && (
                <>
                    <ReviewSection stay={stay} />
                    <MapSection />
                    <HostSection />
                    <ThingsToKnowSection />
                </>
            )}
        </section>
    )
}

export function AirCover() {
    return (
        <div className='air-cover'>
            <h3>
                <img
                    src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'
                    alt='aircover'
                />
            </h3>
            <p>
                Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues
                like trouble checking in.
            </p>
        </div>
    )
}
