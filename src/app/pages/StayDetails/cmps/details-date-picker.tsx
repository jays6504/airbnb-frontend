import moment from 'moment'
import { DatePicker } from '../../../cmps/date-picker'
import { ISearchBy, ISearchByOpts } from '../../../interfaces/search'

interface Props {
    searchBy: ISearchBy
    onSearchChange: (searchOpts: ISearchByOpts) => void
    cityName: string | undefined
    activeModule?: string | null
    onChangeModule: (moduleName: string | null) => void
}

export function DetailsDatePicker({
    searchBy,
    onSearchChange,
    cityName,
    activeModule = 'startDate',
    onChangeModule,
}: Props) {
    const startDateFormatted = moment(searchBy.startDate).format('MMM D, YYYY')
    const endDateFormatted = moment(searchBy.endDate).format('MMM D, YYYY')
    const numNights = moment(searchBy.endDate).diff(moment(searchBy.startDate), 'days')
    const dateRangeTitle = `${numNights} nights in ${cityName}`
    const dateRangeText = `${startDateFormatted} - ${endDateFormatted}`

    function resetDates() {
        onSearchChange({ startDate: null, endDate: null })
        onChangeModule('startDate')
    }

    return (
        <section className='details-date-picker'>
            <h1>
                {!searchBy.startDate && 'Select check-in date'}
                {searchBy.startDate && !searchBy.endDate && 'Select checkout date'}
                {searchBy.startDate && searchBy.endDate && dateRangeTitle}
            </h1>
            <p className='text-muted'>
                {!searchBy.startDate && 'Add your travel dates for exact pricing'}
                {searchBy.startDate && !searchBy.endDate && 'Minimum stay: 1 nights'}
                {searchBy.startDate && searchBy.endDate && dateRangeText}
            </p>
            <DatePicker
                searchBy={searchBy}
                onSetSearchBy={onSearchChange}
                activeModule={activeModule}
                onChangeModule={onChangeModule}
            />
            <div>
                <p className='clear-dates-link' onClick={resetDates}>
                    Clear dates
                </p>
            </div>
        </section>
    )
}
