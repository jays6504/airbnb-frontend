import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMobileWidth } from '../../hooks/useMobileWidth'
import { MobileBottomBar } from '../../cmps/mobile-bottom-bar'
import { ISearchBy, ISearchByOpts } from '../../interfaces/search'
import { IStay } from '../../interfaces/stay'
import { stayService } from '../../services/stay.service'
import { AirCover } from './cmps/air-cover'
import { DetailsDatePicker } from './cmps/details-date-picker'
import { ImageGallery } from './cmps/image-gallery'
import { MapSection } from './cmps/map-section'
import { Reservation } from './cmps/Reservation/reservation'
import { ReviewSection } from './cmps/review-section'
import { StayAmenities } from './cmps/stay-amenities'
import { StayInfo } from './cmps/stay-info'
import { StayIntro } from './cmps/stay-intro'
import { StaySummary } from './cmps/stay-summary'
import { ReviewTitle } from './cmps/review-title'
import { utilService } from '../../services/util.service'

export function StayDetails() {
    const [stay, setStay] = useState<IStay | null>(null)
    const [activeModule, setActiveModule] = useState<string | null>(null)
    const [searchBy, setSearchBy] = useState<ISearchBy>(stayService.getDefaultSearch())
    const { stayId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const isMobileWidth = useMobileWidth(1180)
    const isAvailable = searchBy.endDate && searchBy.startDate

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
            const stay = await stayService.loadStayById(stayId)
            if (!stay) throw new Error('Couldnt load stay')
            setStay(stay)
        } catch (err) {
            // TODO: add user message
            console.log('err:', err)
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

    const buttonText = useMemo(() => {
        return isAvailable ? 'Reserve' : 'Check Availability'
    }, [isAvailable])

    return (
        <section className='stay-details secondary-layout'>
            <StayIntro stay={stay} />
            <ImageGallery imgUrls={imgsToDisplay} />
            <section className='sticky-section-wrapper'>
                <main className='main-details'>
                    {stay && (
                        <>
                            <StayInfo stay={stay} />
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
                {stay && !isMobileWidth ? (
                    <Reservation
                        stay={stay}
                        searchBy={searchBy}
                        onChangeModule={onChangeModule}
                        activeModule={activeModule}
                        onSearchChange={onSearchChange}
                        isAvailable={isAvailable}
                        buttonText={buttonText}
                    />
                ) : stay && isMobileWidth ? (
                    <MobileBottomBar handleClick={() => {}} buttonText={buttonText}>
                        <>
                            <div>
                                <span className='font-medium'>${stay.price}</span>{' '}
                                <span className='text-muted'>night</span>
                            </div>
                            <div>
                                {searchBy.endDate && searchBy.startDate ? (
                                    <span>{`${utilService.formatDateMMMd(searchBy)}`}</span>
                                ) : (
                                    <ReviewTitle avgRate={stay.avgRate} reviewsLength={stay.reviews.length} />
                                )}
                            </div>
                        </>
                    </MobileBottomBar>
                ) : (
                    <div className='reservation skeleton'></div>
                )}
            </section>
            {stay && (
                <>
                    <ReviewSection stay={stay} />
                    <MapSection staySummary={stay.summary} stayLoc={stay.loc} />
                    {/* <HostSection /> */}
                    {/* <ThingsToKnowSection /> */}
                </>
            )}
        </section>
    )
}
