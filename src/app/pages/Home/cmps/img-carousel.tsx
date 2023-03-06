import { useEffect, useRef, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'

export function ImgCarousel({ imgUrls }: { imgUrls: string[] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const elCarousel = useRef<HTMLDivElement>(null)
    const isNavigatingByDot = useRef<boolean>(false)

    useEffect(() => {
        setCurrentImageIndex(0)
    }, [imgUrls])

    useEffect(() => {
        const options = {
            root: elCarousel.current,
            rootMargin: '0px',
            threshold: 0.5,
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-idx') || '0')
                    setCurrentImageIndex(idx)
                }
            })
        }, options)

        document.querySelectorAll('.carousel-item-container').forEach(el => observer.observe(el))

        return () => {
            observer.disconnect()
        }
    }, [])

    function handleNext(): void {
        const isLastIndex = currentImageIndex === imgUrls.length - 1
        if (!isLastIndex) {
            scrollToImage(currentImageIndex + 1)
        }
    }

    function handlePrev(): void {
        const isFirstIndex = currentImageIndex === 0
        if (!isFirstIndex) {
            scrollToImage(currentImageIndex - 1)
        }
    }

    function handleDotClick(idx: number): void {
        isNavigatingByDot.current = true
        scrollToImage(idx)
    }

    function scrollToImage(idx: number): void {
        const itemWidth = elCarousel.current?.offsetWidth || 0 // Width of a single item
        const scrollPosition = idx * itemWidth // Scroll position of the container
        elCarousel.current?.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        })
    }

    function handleScroll() {
        if (elCarousel.current && elCarousel.current.scrollLeft % elCarousel.current.offsetWidth === 0) {
            isNavigatingByDot.current = false
        }
    }

    return (
        <div className='img-carousel'>
            <div ref={elCarousel} className='images-container' onScroll={handleScroll}>
                {imgUrls.map((imgUrl, idx) => (
                    <div key={'i' + idx} data-idx={idx} className='carousel-item-container'>
                        <img src={imgUrl} alt={`Image ${idx}`} />
                    </div>
                ))}
            </div>
            <div
                className={`arrow-right ${currentImageIndex === imgUrls.length - 1 ? 'hidden' : ''}`}
                onClick={handleNext}
            >
                <BsChevronRight />
            </div>
            <div className={`arrow-left ${currentImageIndex === 0 ? 'hidden' : ''}`} onClick={handlePrev}>
                <BsChevronLeft />
            </div>
            <div className='dots-pagination'>
                {imgUrls.map((_, idx) => (
                    <div
                        onClick={() => handleDotClick(idx)}
                        key={'p' + idx}
                        className={`${currentImageIndex === idx ? 'active' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    )
}
