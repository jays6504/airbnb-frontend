import { IStay } from '../../../interfaces/stay'
import { ReviewTitle } from './review-title'
export function ReviewSection({ stay }: { stay: IStay | null }) {
    return (
        <section className='review-section'>
            <section className='intro'>
                <ReviewTitle size={'lg'} avgRate={stay?.avgRate} reviewsLength={stay?.reviews.length} />
                <h1 className='title flex align-center'></h1>
                <div className='rates-list'></div>
            </section>
        </section>
    )
}
