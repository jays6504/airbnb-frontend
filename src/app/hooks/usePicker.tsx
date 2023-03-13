import { useState, useEffect } from 'react'

interface UsePickerProps<T> {
    defaultState: T
}

export function usePicker<T>({ defaultState }: UsePickerProps<T>) {
    const [state, setState] = useState<T>(defaultState)

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (!(event.target instanceof HTMLElement)) return

            if (event.target.closest('.picker-wrapper')) return

            setState(defaultState)
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [defaultState])

    function togglePicker(picker: T) {
        setState(prevState => (prevState === picker ? defaultState : picker))
    }

    return { state, togglePicker }
}
