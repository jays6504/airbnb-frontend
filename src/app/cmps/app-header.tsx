import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IFilterBy } from '../interfaces/filter'
import { RootState } from '../store/store'
import { AppLogo } from './app-logo'
import { OverlayScreen } from './overlay-screen'
import { SearchExpanded } from './search-expanded'
import { SearchTeaser } from './search-teaser'
import { UserMenu } from './user-menu'

export interface ISearchProps {
    activeModule: string | null
    onChangeModule: (module: string) => void
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
    // Lifecycles

    // Methods
    function onChangeModule(module: string | null) {
        if (activeModule === module) return
        setActiveModule(module)
    }

    function onChangeIsExpanded(value: boolean) {
        setIsExpanded(value)
        if (!value) setActiveModule(null)
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
        <div className='app-header'>
            <OverlayScreen isOpen={isExpanded} setIsOpen={onChangeIsExpanded} />
            <header className={`${isExpandedClass} main-layout`}>
                <div className='wrapper flex align-center justify-between'>
                    <div className='logo'>
                        <AppLogo />
                    </div>
                    <SearchTeaser {...searchProps} />
                    <UserMenu />
                </div>
                <SearchExpanded {...searchProps} />
            </header>
        </div>
    )
}
