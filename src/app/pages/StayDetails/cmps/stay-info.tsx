import { IStay } from '../../../interfaces/stay'

export function StayInfo({ stay }: { stay: IStay | null }) {
    return (
        <section className='stay-info'>
            <div className={`${stay ? '' : 'skeleton-container'}`}>
                {stay ? (
                    <>
                        <h1>
                            {stay.type} hosted by {stay.host.fullname}
                        </h1>
                        <div className='stay-more-info'>
                            {stay?.stayDetails &&
                                Object.keys(stay.stayDetails).map((key, idx) => (
                                    <div key={key}>{stay.stayDetails[key] + ` ${key}`}</div>
                                ))}
                        </div>
                    </>
                ) : (
                    <div className='skeleton-details title-skeleton'></div>
                )}
            </div>
            {stay ? (
                <img className='avatar' src={stay.host.imgUrl} alt={stay.host.fullname} />
            ) : (
                <div className='skeleton-details avatar-skeleton'></div>
            )}
        </section>
    )
}
