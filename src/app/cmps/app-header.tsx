import { useSearchParams, useLocation } from 'react-router-dom'

import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ISearchBy, ISearchByOpts } from '../interfaces/search'
import { stayService } from '../services/stay.service'
import { RootState } from '../store/store'
import { AppLogo } from './app-logo'
import { OverlayScreen } from './overlay-screen'
import { SearchForm } from './search-form'
import { SearchTeaser } from './search-teaser'
import { UserMenu } from './user-menu'

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

    let [searchParams, setSearchParams] = useSearchParams()
    // Refs
    const searchFormContainerRef = useRef<HTMLDivElement>(null)

    function handleFormSubmit() {
        let searchParams: ISearchBy = { ...searchBy }
        let oneDay = 1000 * 60 * 60 * 24
        if (!searchParams.endDate && searchParams.startDate)
            searchParams.endDate = new Date(searchParams.startDate.getTime() + oneDay)
        else if (!searchParams.startDate && searchParams.endDate)
            searchParams.startDate = new Date(searchParams.endDate.getTime() - oneDay)

        setSearchParams(prev => ({
            ...prev,
            ...searchParams,
            startDate: formatDate(searchParams.startDate || new Date()),
            endDate: formatDate(searchParams.endDate || new Date(Date.now() + oneDay)),
        }))
    }

    function formatDate(date: Date): string {
        let formatedDate = date
            .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
            .split('/')
            .join('-')
        console.log('formatedDate:', formatedDate)
        return formatedDate
    }

    function onSetSearchBy(searchByOpts: ISearchByOpts) {
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
        <div onClick={handleFormBlur} className='app-header'>
            <OverlayScreen isOpen={isExpanded} setIsOpen={onChangeIsExpanded} />
            <header className={`${isExpandedClass} main-layout`}>
                <div className='wrapper flex align-center justify-between'>
                    <div className='logo'>
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
