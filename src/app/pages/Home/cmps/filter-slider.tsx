import { IFilter } from '../../../interfaces/filter'

interface Props {
    filters: IFilter[]
    onFilterChange: (label: string) => void
}

export function FilterSlider({ filters, onFilterChange }: Props) {
    return (
        <section className='filter-slider'>
            {filters.map(filter => (
                <div className='filter-widget' onClick={() => onFilterChange(filter.title)} key={filter._id}>
                    <img src={filter.img} alt={filter.title} />
                    <p>{filter.title}</p>
                </div>
            ))}
        </section>
    )
}
