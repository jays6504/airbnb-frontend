import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IStay } from '../../interfaces/stay'
import { stayService } from '../../services/stay.service'
import { HostSection } from './cmps/host-section'
import { ImageGallery } from './cmps/image-gallery'
import { MainDetails } from './cmps/main-details'
import { MapSection } from './cmps/map-section'
import { Reservation } from './cmps/reservation'
import { ReviewSection } from './cmps/review-section'
import { StayIntro } from './cmps/stay-intro'
import { ThingsToKnowSection } from './cmps/things-to-know-section'

export function StayDetails() {
    const [stay, setStay] = useState<IStay | null>(null)

    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        if (!stayId) return
        try {
            const stay = await stayService.get(stayId)
            setStay(stay)
        } catch (err) {
            navigate('/airbnb-frontend')
        }
    }
    console.log('stay:', stay)

    return (
        <section className='stay-details'>
            <StayIntro stayName={stay?.name} />
            <ImageGallery imgUrls={stay?.imgUrls} />
            <div className='main-details-wrapper'>
                <MainDetails />
                <Reservation />
            </div>
            <ReviewSection />
            <MapSection />
            <HostSection />
            <ThingsToKnowSection />
        </section>
    )
}
