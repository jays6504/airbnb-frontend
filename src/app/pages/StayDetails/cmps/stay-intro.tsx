export function StayIntro({ stayName }: { stayName: string | undefined }) {
    return !stayName ? (
        <div className='skeleton-details title-skeleton'></div>
    ) : (
        <h1 className='stay-title'>{stayName}</h1>
    )
}
