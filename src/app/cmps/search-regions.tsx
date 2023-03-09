import { ISearchBy, ISearchByOpts } from '../interfaces/search'

const REGIONS = [
    {
        id: 'all',
        label: "I'm Flexible",
        imgUrl: 'https://res.cloudinary.com/dsperrtyj/image/upload/v1678292986/all_np0zob.webp',
    },
    {
        id: 'middle-east',
        label: 'Middle East',
        imgUrl: 'https://res.cloudinary.com/dsperrtyj/image/upload/v1678292986/middle-east_hxxpha.webp',
    },
    {
        id: 'italy',
        label: 'Italy',
        imgUrl: 'https://res.cloudinary.com/dsperrtyj/image/upload/v1678292986/italy_fdawj0.webp',
    },
    {
        id: 'south-america',
        label: 'South America',
        imgUrl: 'https://res.cloudinary.com/dsperrtyj/image/upload/v1678292986/south-america_drnwwl.webp',
    },
    {
        id: 'france',
        label: 'France',
        imgUrl: 'https://res.cloudinary.com/dsperrtyj/image/upload/v1678292986/france_cwg5fh.webp',
    },
    {
        id: 'usa',
        label: 'United States',
        imgUrl: 'https://res.cloudinary.com/dsperrtyj/image/upload/v1678292986/usa_z7kjby.webp',
    },
]
interface IProps {
    searchBy: ISearchBy
    onSetSearchBy: (searchBy: ISearchByOpts) => void
    onChangeModule: (moduleName: string) => void
}
export function SearchRegions({ searchBy, onSetSearchBy, onChangeModule }: IProps) {
    function handleRegionClick(regionLabel: string) {
        onSetSearchBy({ destination: regionLabel })
        onChangeModule('startDate')
    }
    return (
        <section className='search-regions'>
            <h4>Search by region</h4>
            <ul className='regions-list clean-list'>
                {REGIONS.map(region => (
                    <li key={region.id}>
                        <img
                            onClick={() => handleRegionClick(region.label)}
                            className={`${searchBy.destination === region.label ? 'active' : ''}`}
                            src={region.imgUrl}
                            alt=''
                        />
                        <span>{region.label}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
