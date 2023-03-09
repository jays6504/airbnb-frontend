import { useState } from 'react'
import { BiSliderAlt } from 'react-icons/bi'
import { OverlayScreen } from '../../../cmps/overlay-screen'

export function FilterButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <OverlayScreen isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            <button onClick={() => setIsModalOpen(true)} className='filter-button'>
                <BiSliderAlt />
                Filters
            </button>
        </>
    )
}
