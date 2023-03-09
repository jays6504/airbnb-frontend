import { IFilter, IFilterBy } from '../interfaces/filter'
import { ISearchBy } from '../interfaces/search'
import { IReview } from '../interfaces/review'
import { IStayPreview, IStay } from '../interfaces/stay'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const AMOUNT_TO_DISPLAY = 20
const STAY_DB_KEY = 'stayDB'
var gStays: IStay[] = require('../../assets/data/minified-stays.json')
var gFilters: IFilter[] = require('../../assets/data/filters.json')
_initStays()

export const stayService = { query, getDefaultSearch, loadFilters }

async function query(searchBy: ISearchBy = getDefaultSearch(), filterBy: IFilterBy = getDefaultFilter()) {
    try {
        let stays = (await storageService.query(STAY_DB_KEY, AMOUNT_TO_DISPLAY)) as IStay[]
        let filteredStays = _filter(stays, filterBy, searchBy)
        let stayPreviews: IStayPreview[] = filteredStays.map((stay: IStay) => _arrangePreviewData(stay))
        return stayPreviews
    } catch (err) {
        console.log('err:', err)
    }
}

function getDefaultSearch(): ISearchBy {
    return {
        destination: '',
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
        startDate: null,
        endDate: null,
        guests: 0,
    }
}

function getDefaultFilter() {
    return {
        labels: [],
    }
}

function loadFilters(): IFilter[] {
    return [...gFilters]
}

function _filter(stays: IStay[], filterBy: IFilterBy, searchBy: ISearchBy) {
    let filteredStays = stays
    if (filterBy.labels.length) {
        filteredStays = filteredStays.filter(stay => stay.labels.some(label => filterBy.labels.includes(label)))
    }
    if (searchBy.destination) {
        let { destination } = searchBy
        filteredStays = filteredStays.filter(stay => {
            let { address, city, countryCode, country } = stay.loc
            return (
                address.includes(destination) ||
                city.includes(destination) ||
                countryCode.includes(destination) ||
                country.includes(destination)
            )
        })
    }

    return filteredStays
}

function _initStays() {
    let stays
    let storeStays = localStorage.getItem(STAY_DB_KEY)
    stays = storeStays ? JSON.parse(storeStays) : []
    if (!stays || !stays.length) {
        stays = gStays
        localStorage.setItem(STAY_DB_KEY, JSON.stringify(stays))
    }
}

function _arrangePreviewData(stay: IStay): IStayPreview {
    return {
        _id: utilService.makeId(),
        name: stay.name,
        price: stay.price,
        imgUrls: stay.imgUrls,
        isSuperHost: stay.host.isSuperHost,
        loc: stay.loc,
        avgRate: _calcAvgRate(stay.reviews),
        type: stay.type,
    }
}

function _calcAvgRate(stayReviews: IReview[]): string {
    if (!stayReviews.length) return '0'
    let allRatesSum = stayReviews.reduce((acc, review) => {
        const rates = Object.values(review.moreRate)
        let ratesSum = 0
        rates.forEach(r => (ratesSum += r))
        acc += ratesSum / rates.length
        return acc
    }, 0)
    return (allRatesSum / stayReviews.length).toFixed(2)
}
