import { ISearchProps } from './app-header'
import { FaSearch } from 'react-icons/fa'

export function SearchForm({ activeModule, onChangeModule, filterBy, isExpandedClass }: ISearchProps) {
    const modules = [
        { name: 'location', label: 'Where', placeholder: 'Search destinations' },
        { name: 'startDate', label: 'Check in', placeholder: 'Add dates' },
        { name: 'endDate', label: 'Check out', placeholder: 'Add dates' },
        { name: 'guests', label: 'Who', placeholder: 'Add guests' },
    ]

    const getInputValues = (module: { name: string; placeholder: string }): string | number => {
        if (module.name === 'startDate' && filterBy.startDate) return formatDate(filterBy.startDate)
        else if (module.name === 'endDate' && filterBy.endDate) return formatDate(filterBy.endDate)
        else if (module.name === 'location' && filterBy.destination) return filterBy.destination
        else if (module.name === 'guests' && filterBy.guests) return filterBy.guests
        else return ''
    }

    const formatDate = (date: Date): string => {
        // Shows like this: Mar 7
        return date.toLocaleString('default', { month: 'short', day: 'numeric' })
    }

    return (
        <form className={`search-form ${isExpandedClass}`}>
            {modules.map(module => (
                <label onClick={() => onChangeModule(module.name)}>
                    {module.label}
                    <input
                        type={'text'}
                        name={module.name}
                        disabled={module.name !== 'location'}
                        className={`module-outer`}
                        defaultValue={getInputValues(module)}
                        placeholder={module.placeholder}
                    />
                    {module.name === 'guests' && <button>Search</button>}
                </label>
            ))}
        </form>
    )
}
