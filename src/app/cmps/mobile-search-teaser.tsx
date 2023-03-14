import { FaSearch } from 'react-icons/fa'
import { BiSliderAlt } from 'react-icons/bi'
import { ISearchBy } from '../interfaces/search'
import { ISearchProps } from './app-header'

export function MobileSearchTeaser({ onChangeModule, activeModule, searchBy, onChangeIsExpanded }: ISearchProps) {
    return (
        <section onClick={() => onChangeIsExpanded(true)} className='mobile-search-teaser'>
            <button onClick={() => onChangeModule('location')} className='search-btn'>
                <div className='search-icon'>
                    <FaSearch />
                </div>
                <div className='text-container'>
                    <p className='font-medium'>Anywhere</p>
                    <p className='text-muted'>Any week · Add guests</p>
                </div>
            </button>
            <button className='filter-btn'>
                <BiSliderAlt />
            </button>
        </section>
    )
}
