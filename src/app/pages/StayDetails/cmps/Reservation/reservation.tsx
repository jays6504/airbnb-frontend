import { ISearchBy, ISearchByOpts } from '../../../../interfaces/search'
import { IStay } from '../../../../interfaces/stay'
import { useState, useEffect, useRef } from 'react'
import { ReservationHeader } from './cmps/reservation.header'
import { ReservationPickers } from './cmps/reservation.pickers'
import { ReservationTotal } from './cmps/reservation.total'
import { AirbnbBtn } from '../../../../cmps/airbnb-btn'
interface Props {
    searchBy: ISearchBy
    stay: IStay
    onSearchChange: (searchOpts: ISearchByOpts) => void
    activeModule: string | null
    onChangeModule: (moduleName: string | null) => void
    isAvailable: Date | null
    buttonText: string
}

export function Reservation({
    stay,
    searchBy,
    onSearchChange,
    activeModule,
    onChangeModule,
    isAvailable,
    buttonText,
}: Props) {
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
    function handleClick() {
        if (!isAvailable) {
            togglePicker('dates')
        }
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
            <AirbnbBtn handleClick={handleClick}>
                <span>{buttonText}</span>
            </AirbnbBtn>
            {isTotalReady && <ReservationTotal {...{ stay, searchBy }} />}
        </section>
    )
}
