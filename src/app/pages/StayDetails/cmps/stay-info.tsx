import { IStay } from '../../../interfaces/stay'

export function StayInfo({ stay }: { stay: IStay | null }) {
    return (
        <section className='stay-info'>
            <h1>
                {stay?.type} hosted by {stay?.host.fullname}
            </h1>
            <div className='stay-more-info'>
                {stay?.stayDetails &&
                    Object.keys(stay.stayDetails).map(key => <div key={key}>{stay.stayDetails[key] + ` ${key} `}</div>)}
            </div>
        </section>
    )
}
