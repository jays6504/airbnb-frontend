import { IStay } from '../../../interfaces/stay'

export function StayInfo({ stay }: { stay: IStay | null }) {
    return (
        <section className='stay-info'>
            <div>
                {stay ? (
                    <h1>
                        {stay?.type} hosted by {stay?.host.fullname}
                    </h1>
                ) : (
                    <div className='text-skeleton'></div>
                )}
                <div className='stay-more-info'>
                    {stay?.stayDetails &&
                        Object.keys(stay.stayDetails).map(key => (
                            <div key={key}>{stay.stayDetails[key] + ` ${key} `}</div>
                        ))}
                </div>
            </div>
            <img className='avatar' src={stay?.host.imgUrl} alt={stay?.host.fullname} />
        </section>
    )
}
