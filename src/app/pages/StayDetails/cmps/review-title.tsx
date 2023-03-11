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
        <h1 className={`review-title ${size === 'lg' ? 'lg' : 'sm'}`}>
            {!avgRate ? (
                <>
                    {textSkeleton()} {textSkeleton()} {textSkeleton()}
                </>
            ) : (
                <>
                    <FaStar /> {avgRate + ' · '} {reviewsLength}
                    {' reviews'}
                </>
            )}
        </h1>
    )
}
