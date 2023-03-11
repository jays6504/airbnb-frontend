import { FaStar } from 'react-icons/fa'
import { IStay } from '../../../interfaces/stay'
export function ReviewSection({ stay }: { stay: IStay | null }) {
    return (
        <section className='review-section'>
            <section className='intro'>
                <h1 className='title flex align-center'>
                    <FaStar /> {stay?.avgRate} • {stay?.reviews.length} reviews
                </h1>
                <div className='rates-list'></div>
            </section>
        </section>
    )
}
