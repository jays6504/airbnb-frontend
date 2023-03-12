import { StayAmenity } from './stay-amenity'

export function StayAmenities({ amenitiesToDisplay }: { amenitiesToDisplay: string[] | undefined }) {
    return (
        <section className='stay-amenities'>
            <h1>What this place offers</h1>
            {amenitiesToDisplay && (
                <ul className='amenities-list clean-list flex'>
                    {amenitiesToDisplay.map((amenity, index) => (
                        <li key={index}>
                            <StayAmenity amenity={amenity} />
                            <span className='amenity-name'>{amenity}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
