import { useMemo } from 'react'
import moment from 'moment'
import { ISearchBy, ISearchByOpts } from '../../../../../interfaces/search'
import { IStay } from '../../../../../interfaces/stay'
import { DetailsDatePicker } from '../../details-date-picker'
import { SearchGuests } from '../../../../../cmps/search-guests'

interface PickersProps {
    searchBy: ISearchBy
    stay: IStay
    onSearchChange: (searchOpts: ISearchByOpts) => void
    activeModule: string | null
    onChangeModule: (moduleName: string | null) => void
    isPickerShown: {
        dates: boolean
        guests: boolean
    }
    togglePicker: (picker: 'dates' | 'guests' | null) => void
}

export function ReservationPickers({
    stay,
    searchBy,
    onSearchChange,
    activeModule,
    onChangeModule,
    isPickerShown,
    togglePicker,
}: PickersProps) {
    const startDateString = useMemo(() => {
        return searchBy.startDate ? moment(searchBy.startDate).format('YYYY-MM-DD') : ''
    }, [searchBy.startDate])

    const endDateString = useMemo(() => {
        return searchBy.endDate ? moment(searchBy.endDate).format('YYYY-MM-DD') : ''
    }, [searchBy.endDate])

    return (
        <section className='reservation-pickers'>
            <div className={`dates-wrapper ${isPickerShown.dates ? 'open' : ''}`}>
                {isPickerShown.dates && (
                    <div className='date-picker-wrapper'>
                        <DetailsDatePicker
                            closePickers={() => togglePicker(null)}
                            searchBy={searchBy}
                            onSearchChange={onSearchChange}
                            cityName={stay.loc.city}
                            activeModule={activeModule}
                            onChangeModule={onChangeModule}
                        />
                    </div>
                )}
                <div className='inputs-wrapper'>
                    <div onClick={() => togglePicker('dates')} className='reservation-module check-in'>
                        <span className='font-bold'>Check-in</span>
                        <input type='date' readOnly={true} value={startDateString} />
                    </div>
                    <div onClick={() => togglePicker('dates')} className='reservation-module check-out'>
                        <span className='font-bold'>Check-out</span>
                        <input type='date' readOnly={true} value={endDateString} />
                    </div>
                </div>
            </div>
            <div className={`guests-wrapper ${isPickerShown.guests ? 'open' : ''}`}>
                <div onClick={() => togglePicker('guests')} className='reservation-module guests'>
                    <span className='font-bold'>Guests</span>
                    <input type='text' readOnly={true} value={`${searchBy.guests} guests`} />
                </div>
                {isPickerShown.guests && (
                    <div className='guests-picker-wrapper'>
                        <SearchGuests searchBy={searchBy} onSetSearchBy={onSearchChange} />
                        <button onClick={() => togglePicker(null)} className='close-picker-btn'>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
