import { ISearchBy, ISearchByOpts } from '../../../interfaces/search'
import { IStay } from '../../../interfaces/stay'
import { ReviewTitle } from './review-title'
import moment from 'moment'
import { useState, useMemo, useEffect, useRef } from 'react'
import { DetailsDatePicker } from './details-date-picker'
import { SearchGuests } from '../../../cmps/search-guests'
import { AirbnbBtn } from '../../../cmps/airbnb-btn'
interface Props {
    searchBy: ISearchBy
    stay: IStay
    onSearchChange: (searchOpts: ISearchByOpts) => void
    activeModule: string | null
    onChangeModule: (moduleName: string | null) => void
}

export function Reservation({ stay, searchBy, onSearchChange, activeModule, onChangeModule }: Props) {
    const reservationContainerRef = useRef<HTMLDivElement>(null)
    const isTotalReady = searchBy.endDate && searchBy.startDate
    const [isPickerShown, setIsPickerShown] = useState<{ dates: boolean; guests: boolean }>({
        dates: false,
        guests: false,
    })

    useEffect(() => {
        if (!searchBy.adults) onSearchChange({ guests: 1, adults: 1 })
    }, [])

    useEffect(() => {
        if (isPickerShown.dates || isPickerShown.guests) {
            document.addEventListener('click', handleOutsideClick)
            return () => document.removeEventListener('click', handleOutsideClick)
        }
    }, [isPickerShown])

    function handleOutsideClick(e: MouseEvent) {
        const isInsideReservation = reservationContainerRef.current?.contains(e.target as Node)
        if (!isInsideReservation) {
            togglePicker(null)
        }
    }

    function togglePicker(picker: 'dates' | 'guests' | null) {
        if (!picker) {
            setIsPickerShown({ dates: false, guests: false })
            return
        }
        setIsPickerShown(prevState => ({
            ...prevState,
            [picker]: true,
            [picker === 'dates' ? 'guests' : 'dates']: false,
        }))
    }

    return (
        <section ref={reservationContainerRef} className='reservation'>
            <ReservationHeader avgRate={stay.avgRate} reviewsLength={stay.reviews.length} stayPrice={stay.price} />
            <ReservationPickers
                stay={stay}
                searchBy={searchBy}
                onSearchChange={onSearchChange}
                activeModule={activeModule}
                onChangeModule={onChangeModule}
                isPickerShown={isPickerShown}
                togglePicker={togglePicker}
            />
            <ReservationButton searchBy={searchBy} togglePicker={togglePicker} />
            {isTotalReady && <ReservationTotal {...{ stay, searchBy }} />}
        </section>
    )
}

interface HeaderProps {
    avgRate: string | undefined
    reviewsLength: number
    stayPrice: number
}

function ReservationHeader({ avgRate, reviewsLength, stayPrice }: HeaderProps) {
    return (
        <header className='reservation-header flex align-center justify-between'>
            <div className='header-price font-medium'>
                {'$'}
                {stayPrice + ' '}
                <span className='suffix'>night</span>
            </div>
            <ReviewTitle avgRate={avgRate} reviewsLength={reviewsLength} />
        </header>
    )
}

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

function ReservationPickers({
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

interface ButtonProps {
    searchBy: ISearchBy
    togglePicker: (picker: 'dates' | 'guests' | null) => void
}

function ReservationButton({ searchBy, togglePicker }: ButtonProps) {
    const isAvailable = searchBy.endDate && searchBy.startDate

    const buttonText = useMemo(() => {
        return isAvailable ? 'Reserve' : 'Check Availability'
    }, [searchBy.endDate, searchBy.startDate])

    function handleClick() {
        if (!isAvailable) {
            togglePicker('dates')
        }
    }

    return (
        <AirbnbBtn handleClick={handleClick}>
            <span>{buttonText}</span>
        </AirbnbBtn>
    )
}

interface TotalProps {
    searchBy: ISearchBy
    stay: IStay
}

function ReservationTotal({ searchBy, stay }: TotalProps) {
    const numNights = moment(searchBy.endDate).diff(moment(searchBy.startDate), 'days')
    const serviceFee = 90
    const totalPrice = stay.price * numNights + serviceFee
    return (
        <section className='reservation-total'>
            <p className='wont-charged-msg text-muted'>You won't be charged yet</p>
            <section>
                <div className='total-field flex align-center justify-between'>
                    <span>
                        ${stay.price.toFixed(2)} x {numNights} nights
                    </span>
                    <span>${stay.price * numNights}</span>
                </div>
                <div className='total-field flex align-center justify-between'>
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                </div>
            </section>
            <section className='total-sum flex align-center justify-between font-medium'>
                <span>Total</span>
                <span>${totalPrice}</span>
            </section>
        </section>
    )
}
