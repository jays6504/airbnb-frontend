import { ISearchBy, ISearchByOpts } from '../../../interfaces/search'
import { IStay } from '../../../interfaces/stay'
import { ReviewTitle } from './review-title'
import moment from 'moment'
import { useState } from 'react'
import { DetailsDatePicker } from './details-date-picker'

interface Props {
    searchBy: ISearchBy
    stay: IStay
    onSearchChange: (searchOpts: ISearchByOpts) => void
    activeModule: string | null
    onChangeModule: (moduleName: string | null) => void
}

export function Reservation({ stay, searchBy, onSearchChange, activeModule, onChangeModule }: Props) {
    const isTotalReady = searchBy.endDate && searchBy.startDate
    return (
        <section className='reservation'>
            <ReservationHeader avgRate={stay.avgRate} reviewsLength={stay.reviews.length} stayPrice={stay.price} />
            <ReservationPickers {...{ stay, searchBy, onSearchChange, activeModule, onChangeModule }} />
            <ReservationButton {...{ stay, searchBy }} />
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
}

export function ReservationPickers({ stay, searchBy, onSearchChange, activeModule, onChangeModule }: PickersProps) {
    const startDateString = searchBy.startDate ? moment(searchBy.startDate).format('YYYY-MM-DD') : ''
    const endDateString = searchBy.endDate ? moment(searchBy.endDate).format('YYYY-MM-DD') : ''
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    return (
        <section className='reservation-pickers'>
            <div className={`dates-wrapper ${isDatePickerOpen ? 'open' : ''}`}>
                {isDatePickerOpen && (
                    <div className='date-picker-wrapper'>
                        <DetailsDatePicker
                            searchBy={searchBy}
                            onSearchChange={onSearchChange}
                            cityName={stay.loc.city}
                            activeModule={activeModule}
                            onChangeModule={onChangeModule}
                        />
                    </div>
                )}
                <div className='inputs-wrapper'>
                    <div onClick={() => setIsDatePickerOpen(prev => !prev)} className='reservation-module check-in'>
                        <span className='font-bold'>Check-in</span>
                        <input type='date' readOnly={true} value={startDateString} />
                    </div>
                    <div onClick={() => setIsDatePickerOpen(prev => !prev)} className='reservation-module check-out'>
                        <span className='font-bold'>Check-out</span>
                        <input type='date' readOnly={true} value={endDateString} />
                    </div>
                </div>
            </div>
            <div className='reservation-module guests'>
                <span className='font-bold'>Guests</span>
                <input type='text' readOnly={true} value={`${searchBy.guests || 1} guests`} />
            </div>
        </section>
    )
}

interface ButtonProps {
    searchBy: ISearchBy
    stay: IStay
}
interface ReservationButtonStyle extends React.CSSProperties {
    '--mouseX'?: number
    '--mouseY'?: number
}
function ReservationButton({ stay, searchBy }: ButtonProps) {
    const [mouseX, setX] = useState(0)
    const [mouseY, setY] = useState(0)

    const buttonText = searchBy.endDate && searchBy.startDate ? 'Reserve' : 'Check Availability'

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        setX((event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100)
        setY((event.nativeEvent.offsetY / event.currentTarget.offsetHeight) * 100)
    }
    const buttonStyle: ReservationButtonStyle = {
        '--mouseX': mouseX,
        '--mouseY': mouseY,
    }
    return (
        <button className='reservation-button' style={buttonStyle} onMouseMove={handleMouseMove}>
            {buttonText}
        </button>
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
