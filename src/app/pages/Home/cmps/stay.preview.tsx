import React, { useState } from 'react'
import { IStayPreview } from '../../../interfaces/stay'
import { ImgCarousel } from './img-carousel'
import { FaStar } from 'react-icons/fa'

interface IPreviewProps {
    stay: IStayPreview | undefined
    onAddToWishlist?: () => void
    isMapView: boolean
    delay?: number
    onStayClick: (stayId: string) => void
}

export const StayPreview: React.FC<IPreviewProps> = ({ stay, isMapView, onAddToWishlist, delay, onStayClick }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const skeleton = () => {
        return (
            <div className='skeleton-preview'>
                <div className='img-skeleton'></div>
                <section className='meta'>
                    <div className='group flex align-center'>
                        <div className='skeleton text-skeleton'></div>
                        <div className='flex'>
                            <div className='skeleton icon-skeleton'></div>
                        </div>
                    </div>
                    <div className='skeleton text-skeleton'></div>
                    <div className='skeleton text-skeleton'></div>
                </section>
            </div>
        )
    }

    if (!stay) return skeleton()
    return (
        <article
            className={`stay-preview ${isMapView ? 'map-view' : ''} ${isLoaded ? 'loaded' : ''}`}
            onLoad={() => setIsLoaded(true)}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <ImgCarousel imgUrls={stay.imgUrls || []} />
            <div onClick={() => onStayClick(stay._id)} className='meta'>
                <p className='rate'>
                    <span className='flex align-center'>
                        <FaStar />
                        <span>{stay.avgRate}</span>
                    </span>
                </p>
                <p className='name font-medium inline-clamp'>{stay.name}</p>
                <p className='type'>{stay.type}</p>
                <p className='price font-medium'>
                    ${stay.price}
                    <span className='price-suffix font-base'>night</span>
                </p>
            </div>
        </article>
    )
}
