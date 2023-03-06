import React from 'react'
import { IStayPreview } from '../../interfaces/stay'
import { StayPreview } from './stay.preview'

interface IListProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
}

export const StayList: React.FC<IListProps> = ({ stays, onAddToWishlist }) => {
    console.log('stays:', stays)

    const childProps = (stay: IStayPreview) => {
        return { stay, onAddToWishlist }
    }
    return (
        <section className='stay-list'>
            {stays.map(stay => (
                <StayPreview key={stay._id} {...childProps(stay)} />
            ))}
        </section>
    )
}
