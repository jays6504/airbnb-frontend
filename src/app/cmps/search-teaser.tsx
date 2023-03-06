import { IFilterBy } from '../interfaces/filter'
import { ISearchProps } from './app-header'
import { FaSearch } from 'react-icons/fa'

export function SearchTeaser({
    activeModule,
    onChangeModule,
    filterBy,
    isExpandedClass,
    onChangeIsExpanded,
}: ISearchProps) {
    let titles: { [key: string]: string } = {
        'location': filterBy.destination ? filterBy.destination : 'Anywhere',
        'start-date': filterBy.startDate ? filterBy.startDate.toString() : 'Any week',
        'guests': filterBy.adults ? `${filterBy.adults} guests` : 'Add guests',
    }

    return (
        <section onClick={() => onChangeIsExpanded(true)} className={`search-teaser ${isExpandedClass}`}>
            {Object.keys(titles).map(title => (
                <button key={title} onClick={() => onChangeModule(title)}>
                    <span className={`${title !== 'guests' ? 'divider font-medium' : ''}`}> {titles[title]} </span>
                </button>
            ))}
            <button className='search-btn small btn-icon primary circled'>
                <FaSearch />
            </button>
        </section>
    )
}
