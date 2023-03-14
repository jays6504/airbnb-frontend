import { useState } from 'react'
import { BiSliderAlt } from 'react-icons/bi'
import Modal from '../../../cmps/modal'

export function FilterButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='content'>Hello modal</div>
            </Modal>
            <button onClick={() => setIsModalOpen(true)} className='filter-button'>
                <BiSliderAlt />
                Filters
            </button>
        </>
    )
}
