import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IStayPreview } from '../../interfaces/stay'
import { stayService } from '../../services/stay.service'

export function StayDetails() {
    const [stay, setStay] = useState<IStayPreview | null>(null)

    const { stayId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        if (!stayId) return
        stayService
            .get(stayId)
            .then(stay => {
                console.log('stay:', stay)
                setStay(stay)
            })
            .catch(err => {
                navigate('/airbnb-frontend')
            })
    }
    return (
        <section className='stay-details'>
            Hello from StayDetails
            <h1>stayId : {JSON.stringify(stay)}</h1>
        </section>
    )
}
