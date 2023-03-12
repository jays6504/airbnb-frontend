import { DatePicker } from '../../../cmps/date-picker'
import { ISearchBy, ISearchByOpts } from '../../../interfaces/search'

interface Props {
    searchBy: ISearchBy
    onSearchChange: (searchOpts: ISearchByOpts) => void
    cityName: string | undefined
    activeModule: string | null
    onChangeModule: (moduleName: string | null) => void
}

export function DetailsDatePicker({ searchBy, onSearchChange, cityName, activeModule, onChangeModule }: Props) {
    return (
        <section className='details-date-picker'>
            <DatePicker
                searchBy={searchBy}
                onSetSearchBy={onSearchChange}
                activeModule={activeModule || 'startDate'}
                onChangeModule={onChangeModule}
            />
        </section>
    )
}
