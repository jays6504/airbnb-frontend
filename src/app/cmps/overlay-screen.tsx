interface IOverlayProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export function OverlayScreen({ isOpen, setIsOpen }: IOverlayProps) {
    return <div onClick={() => setIsOpen(false)} className={`overlay-screen ${isOpen ? 'open' : ''}`}></div>
}
