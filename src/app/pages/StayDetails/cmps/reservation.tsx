import { ISearchBy } from '../../../interfaces/search'
import { IStay } from '../../../interfaces/stay'
import { ReviewTitle } from './review-title'
import moment from 'moment'
import { useState } from 'react'

interface Props {
    searchBy: ISearchBy
    stay: IStay
}

export function Reservation({ stay, searchBy }: Props) {
    const isTotalReady = searchBy.endDate && searchBy.startDate
    return (
        <section className='reservation'>
            <ReservationHeader avgRate={stay.avgRate} reviewsLength={stay.reviews.length} stayPrice={stay.price} />
            <ReservationPickers {...{ stay, searchBy }} />
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
}

export function ReservationPickers({ stay, searchBy }: PickersProps) {
    const startDateString = searchBy.startDate ? moment(searchBy.startDate).format('YYYY-MM-DD') : ''
    const endDateString = searchBy.endDate ? moment(searchBy.endDate).format('YYYY-MM-DD') : ''
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    return (
        <section className='reservation-pickers'>
            <div className={`dates-wrapper ${isDatePickerOpen ? 'open' : ''}`}>
                {isDatePickerOpen && <div className='date-picker-wrapper'></div>}
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
    const totalPrice = stay.price * numNights
    return (
        <section className='reservation-total'>
            <p className='wont-charged-msg text-muted'>You won't be charged yet</p>
            <div className='total-calc'>
                <div className='total-field flex align-center justify-between'>
                    <span>
                        ${stay.price.toFixed(2)} x {numNights} nights
                    </span>
                    <span>${stay.price * numNights}</span>
                </div>
                <div className='total-field flex align-center justify-between'>
                    <span>Service fee</span>
                    <span>$90</span>
                </div>
            </div>
            <div className='total-sum flex align-center justify-between font-medium'>
                <span>Total</span>
                <span>${totalPrice}</span>
            </div>
        </section>
    )
}
