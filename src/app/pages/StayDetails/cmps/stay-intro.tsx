import { IStay } from '../../../interfaces/stay'

export function StayIntro({ stay }: { stay: IStay | null }) {
    return !stay ? <div className='skeleton-details title-skeleton'></div> : <h1 className='stay-title'>{stay.name}</h1>
}
