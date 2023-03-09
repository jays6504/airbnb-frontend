import { useState } from 'react'
import moment, { Moment } from 'moment'
import { DayPickerRangeController, FocusedInputShape } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import { ISearchBy } from '../interfaces/search'

interface IDatePickerProps {
    searchBy: ISearchBy
}

export function DatePicker({ searchBy }: IDatePickerProps) {
    const startDate = searchBy.startDate ? moment(searchBy.startDate) : null
    const endDate = searchBy.endDate ? moment(searchBy.endDate) : null

    const [focus, setFocus] = useState<FocusedInputShape | null>(null)
    const [selectedDates, setSelectedDates] = useState<{ [key: string]: Moment | null }>({
        startDate: null,
        endDate: null,
    })

    const handleDatesChange = ({ startDate, endDate }: { startDate: Moment | null; endDate: Moment | null }): void => {
        setSelectedDates({ startDate, endDate })
    }

    return (
        <section className='datepicker'>
            <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={handleDatesChange}
                focusedInput={focus}
                onFocusChange={(newFocus: FocusedInputShape | null) => setFocus(newFocus)}
                numberOfMonths={2}
                minimumNights={3}
                isOutsideRange={day => day.isBefore(moment().subtract(1, 'days'), 'day')}
                hideKeyboardShortcutsPanel={true}
                initialVisibleMonth={() => moment()}
            />
        </section>
    )
}
