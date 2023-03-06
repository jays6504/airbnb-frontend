import { IFilterBy } from '../interfaces/filter'
import { ISearchProps } from './app-header'

export function SearchTeaser({ activeModule, onChangeModule, filterBy, isExpandedClass }: ISearchProps) {
    return <section className={`search-teaser ${isExpandedClass}`}>Hello from SearchTeaser</section>
}
