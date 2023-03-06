import { ISearchProps } from './app-header'

export function SearchExpanded({ activeModule, onChangeModule, filterBy, isExpandedClass }: ISearchProps) {
    return <section className={`search-expanded ${isExpandedClass}`}>Hello from SearchTeaser</section>
}
