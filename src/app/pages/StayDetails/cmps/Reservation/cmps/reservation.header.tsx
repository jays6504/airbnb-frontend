import { ReviewTitle } from '../../review-title'

interface HeaderProps {
    avgRate: string | undefined
    reviewsLength: number
    stayPrice: number
}

export function ReservationHeader({ avgRate, reviewsLength, stayPrice }: HeaderProps) {
    return (
        <header className='reservation-header flex align-center justify-between'>
            <div className='header-price font-medium'>
                {'$'}
                {stayPrice + ' '}
                <span className='suffix'>night</span>
            </div>
            <ReviewTitle avgRate={avgRate} reviewsLength={reviewsLength} />
        </header>
    )
}
