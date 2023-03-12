import moment from 'moment'
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
    const startDateFormatted = moment(searchBy.startDate).format('MMM D, YYYY')
    const endDateFormatted = moment(searchBy.endDate).format('MMM D, YYYY')
    const numNights = moment(searchBy.endDate).diff(moment(searchBy.startDate), 'days')
    const dateRangeText = `${startDateFormatted} - ${endDateFormatted}`
    return (
        <section className='details-date-picker'>
            <h1>
                {numNights} nights in {cityName}
            </h1>
            <p className='text-muted'>{dateRangeText}</p>
            <DatePicker
                searchBy={searchBy}
                onSetSearchBy={onSearchChange}
                activeModule={activeModule || 'startDate'}
                onChangeModule={onChangeModule}
            />
        </section>
    )
}
