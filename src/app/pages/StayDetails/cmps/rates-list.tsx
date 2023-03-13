import { ProgressBar } from '../../../cmps/progress-bar'

interface Props {
    avgRates: { [k: string]: number }
}

export function RatesList({ avgRates }: Props) {
    return (
        <ul className='reviews-list rates-list clean-list flex column'>
            {Object.keys(avgRates).map((rate, idx) => (
                <RateListItem key={`drl-${idx}`} rate={avgRates[rate]} name={rate} />
            ))}
        </ul>
    )
}

function RateListItem({ rate, name }: { rate: number; name: string }) {
    return (
        <li className='rate-list-item'>
            <div className='rate-name'>{name}</div>
            <div className='rate-value-container'>
                <ProgressBar value={rate} maxValue={5} />
                <div className='rate-value'>{rate.toFixed(1)}</div>
            </div>
        </li>
    )
}
