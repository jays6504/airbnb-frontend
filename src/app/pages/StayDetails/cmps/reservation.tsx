import { ISearchBy } from '../../../interfaces/search'
import { IStay } from '../../../interfaces/stay'
import { ReviewTitle } from './review-title'
import moment from 'moment'

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
            <div className='font-medium'>
                {'$'}
                {stayPrice + ' night'}
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

    return (
        <section className='reservation-pickers'>
            <div className='dates-wrapper'>
                <label className='check-in'>
                    <span className='font-bold'>Check-in</span>
                    <input type='date' readOnly={true} value={startDateString} />
                </label>
                <label className='check-out'>
                    <span className='font-bold'>Check-out</span>
                    <input type='date' readOnly={true} value={endDateString} />
                </label>
            </div>
            <label className='guests'>
                <span className='font-bold'>Guests</span>
                <input type='text' readOnly={true} value={`${searchBy.guests || 1} guests`} />
            </label>
        </section>
    )
}

interface ButtonProps {
    searchBy: ISearchBy
    stay: IStay
}

function ReservationButton({ stay, searchBy }: ButtonProps) {
    const buttonText = searchBy.endDate && searchBy.startDate ? 'Reserve' : 'Check Availability'
    return <button className='reservation-button'>{buttonText}</button>
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
            <p>You won't be charged yet</p>
            <div className='total-calc'>
                <div className='total flex align-center justify-between'>
                    <span>
                        ${stay.price.toFixed(2)} x {numNights} nights
                    </span>
                    <span>${stay.price * numNights}</span>
                </div>
            </div>
            <div className='total flex align-center justify-between font-medium'>
                <span>Total</span>
                <span>${totalPrice}</span>
            </div>
        </section>
    )
}
