import moment from 'moment'
import { ISearchBy } from '../../../../../interfaces/search'
import { IStay } from '../../../../../interfaces/stay'

interface TotalProps {
    searchBy: ISearchBy
    stay: IStay
}

export function ReservationTotal({ searchBy, stay }: TotalProps) {
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
