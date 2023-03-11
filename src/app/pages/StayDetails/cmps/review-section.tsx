import { FaStar } from 'react-icons/fa'
export function ReviewSection() {
    return (
        <section className='review-section'>
            <section className='intro'>
                <h1 className='title flex align-center'>
                    <FaStar /> 4.76 • 148 reviews
                </h1>
                <div className='rates-list'></div>
            </section>
        </section>
    )
}
