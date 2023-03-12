import { FaStar } from 'react-icons/fa'
export function ReviewTitle({
    size = 'sm',
    avgRate,
    reviewsLength,
}: {
    size?: string
    reviewsLength: number | undefined
    avgRate: string | undefined
}) {
    const textSkeleton = () => <div className='skeleton-details text-skeleton'></div>
    return (
        <div className={`review-title ${size === 'lg' ? 'lg' : 'sm'}`}>
            {!avgRate ? (
                <>
                    {textSkeleton()} {textSkeleton()} {textSkeleton()}
                </>
            ) : (
                <>
                    <FaStar /> {parseFloat(avgRate).toFixed(1) + ' · '} {reviewsLength}
                    {' reviews'}
                </>
            )}
        </div>
    )
}
