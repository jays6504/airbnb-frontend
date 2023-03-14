import { useState, useEffect } from 'react'

const MOBILE_WIDTH = 740

export function useMobileWidth() {
    const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false)

    useEffect(() => {
        function handleResize() {
            setIsMobileWidth(window.innerWidth < MOBILE_WIDTH)
        }
        handleResize() // Call the function once to set the initial value
        window.addEventListener('resize', handleResize) // Listen for window resize events
        return () => window.removeEventListener('resize', handleResize) // Clean up event listener on unmount
    }, [])

    return isMobileWidth
}
