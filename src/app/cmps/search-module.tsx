import { FaSearch } from 'react-icons/fa'
import { ISearchBy } from '../interfaces/search'

interface IModuleProps {
    name: string
    label: string
    placeholder: string
    activeModule: string | null
    searchBy: ISearchBy
    onChangeModule: (module: string | null) => void
    handleFormSubmit: () => void
}

export function SearchModule({
    activeModule,
    name,
    label,
    placeholder,
    searchBy,
    onChangeModule,
    handleFormSubmit,
}: IModuleProps) {
    const getInputValue = (): string | number => {
        const formatDate = (date: Date): string => {
            return date.toLocaleString('default', { month: 'short', day: 'numeric' })
        }

        if (name === 'startDate' && searchBy.startDate) {
            return formatDate(searchBy.startDate)
        } else if (name === 'endDate' && searchBy.endDate) {
            return formatDate(searchBy.endDate)
        } else if (name === 'location' && searchBy.destination) {
            return searchBy.destination
        } else if (name === 'guests' && searchBy.guests) {
            return `${searchBy.guests} guests`
        } else {
            return ''
        }
    }

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
        console.log('ev:', ev)
    }

    return (
        <div
            onClick={() => onChangeModule(name)}
            className={`module ${activeModule && name === activeModule ? 'active' : ''}`}
        >
            <div>
                <span className='module-title'>{label}</span>
                <input
                    type={'text'}
                    name={name}
                    readOnly={name !== 'location'}
                    className={`module-selection`}
                    value={getInputValue()}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                />
                <button className='module-reset-btn'>X</button>
            </div>
            {name === 'guests' && (
                <button onClick={handleFormSubmit} className='form-search-btn' type='button'>
                    <FaSearch />
                    {activeModule && 'Search'}
                </button>
            )}
        </div>
    )
}
