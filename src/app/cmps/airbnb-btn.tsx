import { useState, ReactElement } from 'react'

interface ReservationButtonStyle extends React.CSSProperties {
    '--mouseX'?: number
    '--mouseY'?: number
}

interface Props {
    children: ReactElement
    handleClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}

export function AirbnbBtn({ children, handleClick, ...rest }: Props) {
    const [mouseX, setX] = useState(0)
    const [mouseY, setY] = useState(0)
    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        setX((event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100)
        setY((event.nativeEvent.offsetY / event.currentTarget.offsetHeight) * 100)
    }

    const buttonStyle: ReservationButtonStyle = {
        '--mouseX': mouseX,
        '--mouseY': mouseY,
    }
    return (
        <button
            {...rest}
            onClick={handleClick ? handleClick : () => {}}
            className='airbnb-btn'
            style={buttonStyle}
            onMouseMove={handleMouseMove}
        >
            {children}
        </button>
    )
}
