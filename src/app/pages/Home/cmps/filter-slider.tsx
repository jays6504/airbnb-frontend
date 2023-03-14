import { useState, useRef, useEffect } from 'react'
import { IFilter } from '../../../interfaces/filter'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

interface Props {
    filters: IFilter[]
    onFilterChange: (label: string) => void
}

export function FilterSlider({ filters, onFilterChange }: Props) {
    const filterItemsRef = useRef<HTMLDivElement>(null)
    const [isEnd, setIsEnd] = useState(false)
    const [isStart, setIsStart] = useState(true)

    useEffect(() => {
        if (!filterItemsRef.current) return
        calcIsFullyScrolled()

        const handleScroll = () => {
            calcIsFullyScrolled()
        }

        filterItemsRef.current.addEventListener('scroll', handleScroll)

        return () => {
            filterItemsRef.current?.removeEventListener('scroll', handleScroll)
        }
    }, [filterItemsRef.current?.scrollLeft])

    const onScrollFilters = (direction: number) => {
        if (filterItemsRef.current) {
            const { clientWidth } = filterItemsRef.current
            filterItemsRef.current.scrollLeft += clientWidth * 0.6 * direction
        }
    }

    const calcIsFullyScrolled = () => {
        if (!filterItemsRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = filterItemsRef.current
        setIsEnd(Math.round(scrollLeft) === Math.round(scrollWidth - clientWidth))
        setIsStart(scrollLeft === 0)
    }

    return (
        <section className={`filter-slider ${!isStart ? 'before-shown' : ''} ${isEnd ? 'after-hidden' : ''}`}>
            <button
                onClick={() => onScrollFilters(-1)}
                className={`filters-nav-btn prev-filters-btn ${!isStart ? 'shown' : ''}`}
            >
                <FaChevronLeft size={'.75rem'} />
            </button>
            <div className='filter-items flex' ref={filterItemsRef}>
                {filters.map(filter => (
                    <div className='filter-widget' onClick={() => onFilterChange(filter.title)} key={filter._id}>
                        <img src={filter.img} alt={filter.title} />
                        <p>{filter.title}</p>
                    </div>
                ))}
            </div>
            <button
                onClick={() => onScrollFilters(1)}
                className={`filters-nav-btn next-filters-btn ${!isEnd ? 'shown' : ''}`}
            >
                <FaChevronRight size={'.75rem'} />
            </button>
        </section>
    )
}
