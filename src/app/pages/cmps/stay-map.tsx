import { IStayPreview } from '../../interfaces/stay'

interface Props {
    stays: IStayPreview[]
    onAddToWishlist: () => void
}

export function StayMap({ stays }: Props) {
    return <section className='stay-map'>Hello from StayMap</section>
}
