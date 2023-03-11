export function StaySummary({ staySummary }: { staySummary: string | undefined }) {
    return <section className='stay-summary line-clamp-5'>{staySummary}</section>
}
