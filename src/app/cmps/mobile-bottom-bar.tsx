import { ReactElement } from 'react'
import { AirbnbBtn } from './airbnb-btn'

interface Props {
    handleClick: () => void
    buttonText: string
    children: ReactElement
}

export function MobileBottomBar({ children, handleClick, buttonText }: Props) {
    return (
        <section className='mobile-bottom-bar'>
            <div className='wrapper flex align-center justify-between'>
                <div className='content'>{children}</div>
                <AirbnbBtn handleClick={handleClick}>
                    <span>{buttonText}</span>
                </AirbnbBtn>
            </div>
        </section>
    )
}
