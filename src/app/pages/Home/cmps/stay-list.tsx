import React from 'react'
import { IStayPreview } from '../../../interfaces/stay'
import { StayPreview } from './stay.preview'

interface IListProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
    isLoading: boolean
}

export const StayList: React.FC<IListProps> = ({ stays, onAddToWishlist, isMapView, isLoading }) => {
    const childProps = (stay: IStayPreview) => {
        return { stay, onAddToWishlist, isMapView }
    }
    function getSkeletonArray() {
        return Array.from({ length: 20 }, (_, index) => <StayPreview key={index} stay={undefined} isMapView={false} />)
    }
    return (
        <section className='stay-list'>
            {stays.length
                ? stays.map(stay => <StayPreview key={stay._id} {...childProps(stay)} />)
                : getSkeletonArray()}
        </section>
    )
}
