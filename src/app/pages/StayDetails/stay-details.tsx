import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../../services/stay.service'

export function StayDetails() {
    const [stay, setStay] = useState<string | null>(null)

    const { stayId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        if (!stayId) return
        stayService
            .get(stayId)
            .then(setStay)
            .catch(err => {
                navigate('/stay')
            })
    }
    return (
        <section className='stay-details'>
            Hello from StayDetails
            <h1>stayId : {stayId}</h1>
        </section>
    )
}
