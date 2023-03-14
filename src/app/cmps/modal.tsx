import { useState, ReactElement } from 'react'
import ReactDom from 'react-dom'
interface ModalProps {
    children: ReactElement
    isOpen: boolean
    onClose: () => void
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
    const portalElement = document.getElementById('portal')
    if (!portalElement) return null // return null if portal element not found

    return ReactDom.createPortal(
        <>
            <div onClick={onClose} className={`modal-overlay ${isOpen ? 'open' : ''}`}></div>
            <div className={`app-modal ${isOpen ? 'open' : ''}`}>
                <button onClick={onClose} className='close-btn'></button>
                {children}
            </div>
        </>,
        portalElement
    )
}
