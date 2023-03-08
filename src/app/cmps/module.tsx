import { FaSearch } from 'react-icons/fa'
import { IFilterBy } from '../interfaces/filter'

interface IModuleProps {
    name: string
    label: string
    placeholder: string
    activeModule: string | null
    filterBy: IFilterBy
    onChangeModule: (moduleName: string | null) => void
}

export function Module({ activeModule, name, label, placeholder, filterBy, onChangeModule }: IModuleProps) {
    const getInputValue = (): string | number => {
        const formatDate = (date: Date): string => {
            return date.toLocaleString('default', { month: 'short', day: 'numeric' })
        }

        if (name === 'startDate' && filterBy.startDate) {
            return formatDate(filterBy.startDate)
        } else if (name === 'endDate' && filterBy.endDate) {
            return formatDate(filterBy.endDate)
        } else if (name === 'location' && filterBy.destination) {
            return filterBy.destination
        } else if (name === 'guests' && filterBy.guests) {
            return filterBy.guests
        } else {
            return ''
        }
    }

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
        console.log('ev:', ev)
    }
    return (
        <>
            <label className='module' onClick={() => onChangeModule(name)}>
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
            </label>
            {name === 'guests' && (
                <button className='form-search-btn' type='button'>
                    <FaSearch />
                    {activeModule && 'Search'}
                </button>
            )}
        </>
    )
}
