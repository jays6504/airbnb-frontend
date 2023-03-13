import { IStay } from '../../../interfaces/stay'

export function StayInfo({ stay }: { stay: IStay }) {
    return (
        <section className='stay-info'>
            <div className={`${stay ? '' : 'skeleton-container'}`}>
                <h1>
                    {stay.type} hosted by {stay.host.fullname}
                </h1>
                <div className='stay-more-info'>
                    {stay?.stayDetails &&
                        Object.keys(stay.stayDetails).map((key, idx) => (
                            <div key={key}>{stay.stayDetails[key] + ` ${key}`}</div>
                        ))}
                </div>
            </div>
            <img className='avatar' src={stay.host.imgUrl} alt={stay.host.fullname} />
        </section>
    )
}
