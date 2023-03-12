import moment from 'moment'
import { useState } from 'react'
import { IReview } from '../../../interfaces/review'

export function ReviewList({ reviewsToDisplay }: { reviewsToDisplay: IReview[] }) {
    return (
        <ul className='reviews-list clean-list flex column'>
            {reviewsToDisplay && reviewsToDisplay.map(review => <ReviewListItem key={review.id} review={review} />)}
        </ul>
    )
}

function ReviewListItem({ review }: { review: IReview }) {
    const [isShowingMore, setIsShowingMore] = useState(false)

    return (
        <li className='review-list-item'>
            <section className='review-by flex align-center'>
                <img className='avatar sm' src={review.by.imgUrl} alt={review.by.fullname} />
                <div>
                    <p className='font-medium'>{review.by.fullname}</p>
                    <p className='text-muted'>{moment(review.createdAt).format('MMMM YYYY')}</p>
                </div>
            </section>
            <section className={`review-body ${!isShowingMore ? 'line-clamp-3' : ''}`}>{review.txt}</section>
            <button onClick={() => setIsShowingMore(prev => !prev)}>
                {!isShowingMore ? 'Show More' : 'Show Less'}
            </button>
        </li>
    )
}
