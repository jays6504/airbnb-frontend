import { useState, useEffect } from 'react'

export function useMobileWidth(mobileWidth = 740) {
    const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false)

    useEffect(() => {
        function handleResize() {
            setIsMobileWidth(window.innerWidth < mobileWidth)
        }
        handleResize() // Call the function once to set the initial value
        window.addEventListener('resize', handleResize) // Listen for window resize events
        return () => window.removeEventListener('resize', handleResize) // Clean up event listener on unmount
    }, [])

    return isMobileWidth
}
