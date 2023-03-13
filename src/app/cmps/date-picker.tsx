import moment, { Moment } from 'moment'
import { DayPickerRangeController, FocusedInputShape } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import { ISearchBy, ISearchByOpts } from '../interfaces/search'

interface IDatePickerProps {
    activeModule?: string | null
    searchBy: ISearchBy
    onSetSearchBy: (searchBy: ISearchByOpts) => void
    onChangeModule: (moduleName: string | null) => void
}

export function DatePicker({ searchBy, onSetSearchBy, activeModule = 'startDate', onChangeModule }: IDatePickerProps) {
    //
    const handleDatesChange = ({ startDate, endDate }: { startDate: Moment | null; endDate: Moment | null }): void => {
        let end = endDate?.toDate()
        let start = startDate?.toDate()
        onSetSearchBy({ startDate: start, endDate: end })
    }
    //
    const handleFocusChange = (newFocus: FocusedInputShape | null) => {
        onChangeModule(newFocus)
    }

    const isOutsideRange = (day: Moment) => {
        return day.isBefore(moment().startOf('day'))
    }

    return (
        <section className='datepicker'>
            <DayPickerRangeController
                startDate={searchBy.startDate ? moment(searchBy.startDate) : null}
                endDate={searchBy.endDate ? moment(searchBy.endDate) : null}
                onDatesChange={handleDatesChange}
                focusedInput={(activeModule as FocusedInputShape) || 'startDate'}
                onFocusChange={handleFocusChange}
                numberOfMonths={2}
                minimumNights={1}
                keepOpenOnDateSelect={true}
                noBorder={true}
                hideKeyboardShortcutsPanel={true}
                initialVisibleMonth={() => moment()}
                isOutsideRange={isOutsideRange}
            />
        </section>
    )
}
