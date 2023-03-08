import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IFilterBy } from '../interfaces/filter'
import { RootState } from '../store/store'
import { AppLogo } from './app-logo'
import { OverlayScreen } from './overlay-screen'
import { SearchForm } from './search-form'
import { SearchTeaser } from './search-teaser'
import { UserMenu } from './user-menu'

export interface ISearchProps {
    activeModule: string | null
    onChangeModule: (module: string | null) => void
    filterBy: IFilterBy
    isExpandedClass: string
    onChangeIsExpanded: (value: boolean) => void
}

export function AppHeader() {
    // State
    const [activeModule, setActiveModule] = useState<string | null>(null)
    const filterBy = useSelector((storeState: RootState) => storeState.stayModule.filterBy)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const isExpandedClass: string = isExpanded ? 'expanded' : ''
    // Refs
    const searchFormContainerRef = useRef<HTMLDivElement>(null)

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
        filterBy,
        isExpandedClass,
        onChangeIsExpanded,
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
