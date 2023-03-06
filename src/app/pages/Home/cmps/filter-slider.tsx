import { IFilter } from '../../../interfaces/filter'
import { FaChevronRight } from 'react-icons/fa'

interface Props {
    filters: IFilter[]
    onFilterChange: (label: string) => void
}

export function FilterSlider({ filters, onFilterChange }: Props) {
    function onNextFilters() {}
    return (
        <section className='filter-slider'>
            {filters.map(filter => (
                <div className='filter-widget' onClick={() => onFilterChange(filter.title)} key={filter._id}>
                    <img src={filter.img} alt={filter.title} />
                    <p>{filter.title}</p>
                </div>
            ))}
            <button onClick={onNextFilters} className='next-filters-btn'>
                <FaChevronRight size={'.75rem'} />
            </button>
        </section>
    )
}
