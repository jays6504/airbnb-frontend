import { useMemo } from 'react'

export function ProgressBar({ value, maxValue }: { value: number; maxValue: number }) {
    const percentValue = useMemo(() => (value / maxValue) * 100, [value, maxValue])

    const bgStyle = useMemo(
        () => ({
            backgroundImage: `linear-gradient(to right, #222 ${percentValue}%, #ddd ${percentValue}% 100%)`,
            height: `0.35rem`,
        }),
        [percentValue]
    )

    return (
        <div className='progress-bar' style={bgStyle}>
            <div className='bar' style={{ width: `${percentValue}%` }} />
        </div>
    )
}
