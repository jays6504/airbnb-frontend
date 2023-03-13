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
import { loadStays } from '../store/stay/stay.actions'

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
    const isExpandedClass: string = isExpanded ? 'expanded' : ''
    const [isDetailsLayout, setIsDetailsLayout] = useState<boolean>(false)
    // Refs
    const searchFormContainerRef = useRef<HTMLDivElement>(null)
    // Search Params
    let [_, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        setIsDetailsLayout(location.pathname.includes('/stay/'))
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.toString() === '') return
        let paramsObj = Object.fromEntries(searchParams.entries())
        let searchObj = stayService.getSearchFromParams(paramsObj)
        setSearchBy(searchObj)
    }, [location])

    function handleFormSubmit() {
        let searchParams: ISearchBy = { ...searchBy }
        let oneDay = 1000 * 60 * 60 * 24
        if (!searchParams.endDate && searchParams.startDate)
            searchParams.endDate = new Date(searchParams.startDate.getTime() + oneDay)
        else if (!searchParams.startDate && searchParams.endDate)
            searchParams.startDate = new Date(searchParams.endDate.getTime() - oneDay)
        onChangeIsExpanded(false)
        setSearchParams(prev => ({
            ...prev,
            ...searchParams,
            startDate: utilService.formatDate(searchParams.startDate || new Date()),
            endDate: utilService.formatDate(searchParams.endDate || new Date(Date.now() + oneDay)),
        }))
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
    return (
        <div onClick={handleFormBlur} className={`app-header`}>
            <OverlayScreen isOpen={isExpanded} setIsOpen={onChangeIsExpanded} />
            <header className={`${isExpandedClass} ${isDetailsLayout ? 'sm-layout' : 'main-layout'} `}>
                <div className={`wrapper flex align-center justify-between`}>
                    <div onClick={() => onBackHome()} className='logo'>
                        <AppLogo />
                    </div>
                    <SearchTeaser {...searchProps} />
                    <UserMenu />
                </div>
                <div
                    ref={searchFormContainerRef}
                    className={`search-form-container ${isExpandedClass} ${!activeModule ? 'blured' : ''}`}
                >
                    <SearchForm {...searchProps} />
                </div>
            </header>
        </div>
    )
}
