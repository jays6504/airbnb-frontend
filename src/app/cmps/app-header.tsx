import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'

import { useRef, useState, useEffect } from 'react'
import { ISearchBy, ISearchByOpts } from '../interfaces/search'
import { stayService } from '../services/stay.service'
import { AppLogo } from './app-logo'
import { OverlayScreen } from './overlay-screen'
import { SearchForm } from './search-form'
import { SearchTeaser } from './search-teaser'
import { UserMenu } from './user-menu'
import { utilService } from '../services/util.service'
import { useMobileWidth } from '../hooks/useMobileWidth'
import { MobileSearchTeaser } from './mobile-search-teaser'
import Modal from './modal'
import { MobileSearchForm } from './mobile-search-form'

export interface ISearchProps {
    activeModule: string | null
    onChangeModule: (module: string | null) => void
    searchBy: ISearchBy
    isExpandedClass: string
    onChangeIsExpanded: (value: boolean) => void
    onSetSearchBy: (searchBy: ISearchByOpts) => void
    handleFormSubmit: () => void
}

export function AppHeader() {
    // State
    const [activeModule, setActiveModule] = useState<string | null>(null)
    const [searchBy, setSearchBy] = useState<ISearchBy>(stayService.getDefaultSearch())
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isDetailsPage, setIsDetailsPage] = useState<boolean>(false)
    const isMobileWidth = useMobileWidth()

    // Refs
    const searchFormContainerRef = useRef<HTMLDivElement>(null)
    // Search Params
    let [_, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        setIsDetailsPage(location.pathname.includes('/stay/'))
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.toString() === '') return
        let paramsObj = Object.fromEntries(searchParams.entries())
        let searchObj = stayService.getSearchFromParams(paramsObj)
        searchObj.guests = searchObj.adults + searchObj.children + searchObj.infants
        setSearchBy(searchObj)
    }, [location])

    function handleFormSubmit() {
        const { destination, startDate, endDate, adults, children, infants, pets } = searchBy
        const oneDay = 1000 * 60 * 60 * 24
        if (!endDate && startDate) {
            searchBy.endDate = new Date(startDate.getTime() + oneDay)
        } else if (!startDate && endDate) {
            searchBy.startDate = new Date(endDate.getTime() - oneDay)
        }
        onChangeIsExpanded(false)
        const params = new URLSearchParams({
            destination,
            startDate: utilService.formatDate(startDate || new Date()),
            endDate: utilService.formatDate(endDate || new Date(Date.now() + oneDay)),
            adults: adults.toString(),
            children: children.toString(),
            infants: infants.toString(),
            pets: pets.toString(),
        })
        if (isDetailsPage) {
            navigate(`/airbnb-frontend/?${params}`)
        } else {
            setSearchParams(params)
        }
    }

    function onSetSearchBy(
        searchByOpts: Pick<
            ISearchByOpts,
            'destination' | 'adults' | 'children' | 'infants' | 'pets' | 'guests' | 'startDate' | 'endDate'
        >
    ) {
        setSearchBy(prev => ({ ...prev, ...searchByOpts }))
    }

    // Methods
    function onChangeModule(module: string | null) {
        if (activeModule === module) return
        setActiveModule(module)
    }

    function onChangeIsExpanded(value: boolean) {
        setIsExpanded(value)
        if (!value) setActiveModule(null)
    }

    function onBackHome() {
        navigate('/airbnb-frontend/')
        setSearchBy(stayService.getDefaultSearch())
        setActiveModule(null)
        setIsExpanded(false)
    }

    const handleFormBlur = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (!isExpanded) return
        const container = searchFormContainerRef.current
        const target = ev.target as Node
        if (container && !container.contains(target)) {
            setActiveModule(null)
        }
    }
    // Props
    const isExpandedClass: string = isExpanded ? 'expanded' : ''
    const searchProps = {
        activeModule,
        onChangeModule,
        searchBy,
        isExpandedClass,
        onChangeIsExpanded,
        onSetSearchBy,
        handleFormSubmit,
    }
    // Template
    return !isMobileWidth ? (
        <div onClick={handleFormBlur} className={`app-header`}>
            <OverlayScreen isOpen={isExpanded} setIsOpen={() => setIsExpanded(false)} />
            <header className={`${isExpandedClass} ${isDetailsPage ? 'secondary-layout' : 'main-layout'} `}>
                <div className={`wrapper flex align-center justify-between`}>
                    <div onClick={() => onBackHome()} className='logo'>
                        <AppLogo />
                    </div>
                    <SearchTeaser {...searchProps} />
                    <UserMenu />
                </div>
                <div
                    ref={searchFormContainerRef}
                    className={`secondary-layout search-form-container ${isExpandedClass} ${
                        !activeModule ? 'blured' : ''
                    }`}
                >
                    <SearchForm {...searchProps} />
                </div>
            </header>
        </div>
    ) : (
        <div className='mobile-header main-layout'>
            <MobileSearchTeaser {...searchProps} />
            {isExpanded && (
                <Modal isOpen={isExpanded} onClose={() => setIsExpanded(false)}>
                    <MobileSearchForm {...searchProps} />
                </Modal>
            )}
        </div>
    )
}
