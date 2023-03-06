import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IFilterBy } from '../interfaces/filter'
import { RootState } from '../store/store'
import { AppLogo } from './app-logo'
import { OverlayScreen } from './overlay-screen'
import { SearchExpanded } from './search-expanded'
import { SearchTeaser } from './search-tease'
import { UserMenu } from './user-menu'

export interface ISearchProps {
    activeModule: string | null
    onChangeModule: (module: string) => void
    filterBy: IFilterBy
    isExpandedClass: string
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
    }
    // Props
    const searchProps = {
        activeModule,
        onChangeModule,
        filterBy,
        isExpandedClass,
    }
    // Template
    return (
        <>
            <OverlayScreen isOpen={isExpanded} setIsOpen={onChangeIsExpanded} />
            <header className={`app-header ${isExpandedClass}`}>
                <div className='wrapper main-layout'>
                    <div className='logo'>
                        <AppLogo />
                    </div>
                    <SearchTeaser {...searchProps} />
                    <UserMenu />
                </div>
                <SearchExpanded {...searchProps} />
            </header>
        </>
    )
}
