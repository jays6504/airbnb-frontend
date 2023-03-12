import { IStay } from '../../../interfaces/stay'
import { ReviewTitle } from './review-title'

export function StayIntro({ stay }: { stay: IStay | null }) {
    return (
        <div className='stay-intro'>
            {!stay ? (
                <div className='skeleton-details title-skeleton'></div>
            ) : (
                <h1 className='stay-title'>{stay.name}</h1>
            )}
            <div>
                <ReviewTitle avgRate={stay?.avgRate} reviewsLength={stay?.reviews.length} />
            </div>
        </div>
    )
}
