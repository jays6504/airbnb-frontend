import { DatePicker } from './date-picker'
import { SearchGuests } from './search-guests'
import { SearchRegions } from './search-regions'

export function SearchModuleExtension({ activeModule }: { activeModule: string }) {
    const getModuleClass = () => {
        if (activeModule === 'location') return 'pos-start'
        else if (activeModule === 'guests') return 'pos-end'
        else return ''
    }
    const getModuleContent = () => {
        if (activeModule === 'startDate' || activeModule === 'endDate') return <DatePicker />
        else if (activeModule === 'location') return <SearchRegions />
        else if (activeModule === 'guests') return <SearchGuests />
    }
    return <section className={`search-module-extension ${getModuleClass()}`}>{getModuleContent()}</section>
}
