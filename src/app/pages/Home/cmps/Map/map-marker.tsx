import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
    lat: number
    lng: number
    idx: number
    isActive: boolean
    handleClick: (event: React.MouseEvent<HTMLDivElement>, idx: number) => void
}

export function MapMarker({ lat, lng, idx, isActive, handleClick, children }: Props) {
    return (
        <div className={`marker-container ${isActive ? 'active' : ''}`}>
            <div onClick={event => handleClick(event, idx)} className='marker'>
                {children}
            </div>
        </div>
    )
}
