import { ISearchBy, ISearchByOpts } from '../interfaces/search'
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'
import { get } from 'lodash'
interface IProps {
    searchBy: ISearchBy
    onSetSearchBy: (searchBy: ISearchByOpts) => void
}

export function SearchGuests({ searchBy, onSetSearchBy }: IProps) {
    const options = [
        { label: 'Adults', description: 'Ages 13 or above' },
        { label: 'Children', description: 'Ages 2–12' },
        { label: 'Infants', description: 'Under 2' },
        { label: 'Pets', description: 'Bringing a service animal?' },
    ]

    function handleCounterClick(opt: string, value: number) {
        const newValue = get(searchBy, opt.toLocaleLowerCase(), 0) + value // Get the current value of the option from searchBy object
        if (newValue < 0) return
        onSetSearchBy({ [opt.toLocaleLowerCase()]: newValue, guests: searchBy.guests + value })
    }

    function getVal(opt: string) {
        return get(searchBy, opt.toLocaleLowerCase(), 0)
    }

    return (
        <section className='search-guests'>
            <ul className='adding-guests-list clean-list flex column'>
                {options.map((opt, idx) => (
                    <li key={`sg-${idx}`} className='adding-guests-item flex align-center justify-between'>
                        <section className='data'>
                            <h4 className='label'>{opt.label}</h4>
                            <p className='description text-muted inline-clamp'>{opt.description}</p>
                        </section>
                        <section className='adding-guests-actions flex align-center'>
                            <div
                                onClick={() => handleCounterClick(opt.label, -1)}
                                className={`minus ${getVal(opt.label) === 0 ? 'disabled' : ''}`}
                            >
                                <HiOutlineMinus />
                            </div>
                            <div className='counter-value'>{get(searchBy, opt.label.toLocaleLowerCase(), 0)}</div>
                            <div
                                onClick={() => handleCounterClick(opt.label, 1)}
                                className={`plus ${getVal(opt.label) === 16 ? 'disabled' : ''}`}
                            >
                                <HiOutlinePlus />
                            </div>
                        </section>
                    </li>
                ))}
            </ul>
        </section>
    )
}
