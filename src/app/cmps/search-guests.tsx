import { ISearchBy, ISearchByOpts } from '../interfaces/search'

interface IProps {
    searchBy: ISearchBy
    onSetSearchBy: (searchBy: ISearchByOpts) => void
}

export function SearchGuests({ searchBy }: IProps) {
    return <section className='search-guests'>Hello from SearchGuests</section>
}
