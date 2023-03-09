import { ISearchBy, ISearchByOpts } from '../interfaces/search'
import { DatePicker } from './date-picker'
import { SearchGuests } from './search-guests'
import { SearchRegions } from './search-regions'

interface IProps {
    activeModule: string
    searchBy: ISearchBy
    onSetSearchBy: (searchBy: ISearchByOpts) => void
    onChangeModule: (moduleName: string) => void
}

export function SearchModuleExtension({ activeModule, searchBy, onSetSearchBy, onChangeModule }: IProps) {
    const getModuleClass = () => {
        if (activeModule === 'location') return 'pos-start'
        else if (activeModule === 'guests') return 'pos-end'
        else return ''
    }
    const getModuleContent = () => {
        if (activeModule === 'startDate' || activeModule === 'endDate') return <DatePicker searchBy={searchBy} />
        else if (activeModule === 'location')
            return <SearchRegions searchBy={searchBy} onSetSearchBy={onSetSearchBy} onChangeModule={onChangeModule} />
        else if (activeModule === 'guests') return <SearchGuests searchBy={searchBy} onSetSearchBy={onSetSearchBy} />
    }
    return <section className={`search-module-extension ${getModuleClass()}`}>{getModuleContent()}</section>
}
