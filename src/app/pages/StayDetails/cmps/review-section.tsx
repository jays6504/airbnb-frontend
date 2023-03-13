import { useMemo } from 'react'
import { IStay } from '../../../interfaces/stay'
import { RatesList } from './rates-list'
import { ReviewList } from './review-list'
import { ReviewTitle } from './review-title'
export function ReviewSection({ stay }: { stay: IStay }) {
    const reviewsToDisplay = useMemo(() => {
        return stay.reviews.slice(0, 6)
    }, [stay])

    return (
        <section className='review-section'>
            <section className='intro'>
                <ReviewTitle size={'lg'} avgRate={stay.avgRate} reviewsLength={stay.reviews.length} />
                <div className='rates-list-wrapper'>{stay.avgRates && <RatesList avgRates={stay.avgRates} />}</div>
                {reviewsToDisplay && <ReviewList reviewsToDisplay={reviewsToDisplay} />}
            </section>
        </section>
    )
}
