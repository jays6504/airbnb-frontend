import { useState } from 'react'
import { BiSliderAlt } from 'react-icons/bi'
import Modal from '../../../cmps/modal'
import { FilterModal } from './filter-modal'

export function FilterButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <FilterModal />
            </Modal>
            <button onClick={() => setIsModalOpen(true)} className='filter-button'>
                <BiSliderAlt />
                Filters
            </button>
        </>
    )
}
