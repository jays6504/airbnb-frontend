import React from 'react'
import { IStayPreview } from '../../../interfaces/stay'
import { ImgCarousel } from './img-carousel'
import { FaStar } from 'react-icons/fa'
interface IPreviewProps {
    stay: IStayPreview
    onAddToWishlist: () => void
    isMapView: boolean
}

export const StayPreview: React.FC<IPreviewProps> = ({ stay, isMapView, onAddToWishlist }) => {
    const skeleton = () => {
        return <div>skeleton</div>
    }

    const stayPreview = () => {
        return (
            <article className={`stay-preview ${isMapView ? 'map-view' : ''}`}>
                <ImgCarousel imgUrls={stay.imgUrls} />
                <div className='meta'>
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

    if (stay) return stayPreview()
    else return skeleton()
}
