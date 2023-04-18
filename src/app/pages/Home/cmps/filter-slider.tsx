import { useState, useRef, useEffect } from 'react'
import { IFilter, IFilterBy } from '../../../interfaces/filter'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

interface Props {
    filters: IFilter[]
    onFilterChange: (label: string) => void
    filterBy: IFilterBy
}

export function FilterSlider({ filters, onFilterChange, filterBy }: Props) {
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
                {filters.length
                    ? filters.map(filter => (
                          <div
                              className={`filter-widget ${filterBy.labels[0] === filter.title ? 'active' : ''}`}
                              onClick={() => onFilterChange(filter.title)}
                              key={filter._id}
                          >
                              <img src={filter.img} alt={filter.title} />
                              <p>{filter.title}</p>
                          </div>
                      ))
                    : Array(20)
                          .fill(undefined)
                          .map((_, index) => (
                              <div key={index} className='filter-widget filter-skeleton-wrapper'>
                                  <div className='filter-skeleton-img'></div>
                                  <div className='filter-skeleton-txt'></div>
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
