import moment from 'moment'
import { stayService } from '../services/stay.service'
import { ISearchProps } from './app-header'
import { DatePicker } from './date-picker'
import { MobileBottomBar } from './mobile-bottom-bar'
import { SearchGuests } from './search-guests'
import { SearchRegions } from './search-regions'

export function MobileSearchForm(props: ISearchProps) {
    const { activeModule, onChangeModule, searchBy, handleFormSubmit, onSetSearchBy } = props
    const formatDate = (date: Date): string => {
        return moment(date).format('MMM D')
    }
    let modules: { [key: string]: { [key: string]: string | number } } = {
        location: { title: 'Where', value: searchBy.destination ? searchBy.destination : "I'm Flexible" },
        startDate: {
            title: 'When',
            value:
                searchBy.startDate && searchBy.endDate
                    ? `${formatDate(searchBy.startDate)} - ${formatDate(searchBy.endDate)}`
                    : 'Add dates',
        },
        guests: { title: 'Who', value: searchBy.adults ? `${searchBy.guests} guests` : 'Add guests' },
    }

    return (
        <section className='mobile-search-form main-layout'>
            <h1 className='title'>Search stays</h1>
            {Object.keys(modules).map(module => (
                <div
                    key={module}
                    className={`module-container ${
                        activeModule === module || (activeModule === 'endDate' && module === 'startDate')
                            ? 'active'
                            : ''
                    }`}
                >
                    {activeModule === module || (activeModule === 'endDate' && module === 'startDate') ? (
                        module === 'location' ? (
                            <SearchRegions {...props} />
                        ) : module === 'guests' ? (
                            <SearchGuests {...props} />
                        ) : (
                            <DatePicker {...props} numOfMonths={1} />
                        )
                    ) : (
                        <button
                            onClick={() => onChangeModule(module)}
                            className='module-tab flex align-center justify-between'
                        >
                            <span className='font-medium text-muted'>{modules[module].title}</span>
                            <span className='font-medium'>{modules[module].value}</span>
                        </button>
                    )}
                </div>
            ))}
            <MobileBottomBar buttonText={'Search'} handleClick={handleFormSubmit}>
                <p onClick={() => onSetSearchBy(stayService.getDefaultSearch())} className='link'>
                    Clear all
                </p>
            </MobileBottomBar>
        </section>
    )
}
