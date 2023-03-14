import moment from 'moment'
import { ISearchProps } from './app-header'
import { FaSearch } from 'react-icons/fa'

export function SearchTeaser({ onChangeModule, searchBy, isExpandedClass, onChangeIsExpanded }: ISearchProps) {
    const formatDate = (date: Date): string => {
        return moment(date).format('MMM D')
    }
    let titles: { [key: string]: string } = {
        location: searchBy.destination ? searchBy.destination : 'Anywhere',
        startDate:
            searchBy.startDate && searchBy.endDate
                ? `${formatDate(searchBy.startDate)} - ${formatDate(searchBy.endDate)}`
                : 'Any week',
        guests: searchBy.adults ? `${searchBy.guests} guests` : 'Add guests',
    }
    const handleClick: React.MouseEventHandler<HTMLElement> = ev => {
        onChangeIsExpanded(true)
    }
    return (
        <section onClick={handleClick} className={`search-teaser ${isExpandedClass}`}>
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
