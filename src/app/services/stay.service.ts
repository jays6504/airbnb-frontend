import { IFilter, IFilterBy } from '../interfaces/filter'
import { ISearchBy } from '../interfaces/search'
import { IReview } from '../interfaces/review'
import { IStayPreview, IStay } from '../interfaces/stay'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const INCREMENT_BY_AMOUNT = 20
const STAY_DB_KEY = 'stayDB'
var gStays: IStay[] = require('../../assets/data/minified-stays.json')
var gFiltersName: string[] = require('../../assets/data/filter-names.json')
var gRegionsName: string[] = require('../../assets/data/regions-names.json')
var gFilters: IFilter[] = require('../../assets/data/filters.json')
_initStays()

export const stayService = {
    query,
    get,
    getDefaultSearch,
    loadFilters,
    getSearchFromParams,
    calcAvgRate,
    calcAvgRates,
}

async function query(searchBy: ISearchBy = getDefaultSearch(), filterBy: IFilterBy = getDefaultFilter(), pageIdx = 0) {
    try {
        let stays = (await storageService.query(STAY_DB_KEY)) as IStay[]
        let filteredStays = _filter(stays, filterBy, searchBy)
        const startIndex = INCREMENT_BY_AMOUNT * pageIdx
        const endIndex = startIndex + INCREMENT_BY_AMOUNT
        let slicedStays = filteredStays.slice(startIndex, endIndex)
        let stayPreviews: IStayPreview[] = slicedStays.map((stay: IStay) => _arrangePreviewData(stay))
        return stayPreviews
    } catch (err) {
        console.log('err:', err)
    }
}

async function get(stayId: string) {
    return storageService.get(STAY_DB_KEY, stayId) as Promise<IStay>
}

function getSearchFromParams(paramsObj: { [k: string]: string }): ISearchBy {
    let searchObj: ISearchBy = {
        adults: +paramsObj.adults || 0,
        children: +paramsObj.children || 0,
        destination: paramsObj.destination || '',
        startDate: utilService.deformatDate(paramsObj.startDate) || null,
        endDate: utilService.deformatDate(paramsObj.endDate) || null,
        infants: +paramsObj.infants || 0,
        pets: +paramsObj.pets || 0,
        guests: +paramsObj.guests || 0,
    }
    if (searchObj.destination === "I'm Flexible") searchObj.destination = ''
    return searchObj
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
    let filters = [...gFilters]
    filters.forEach(filter => {
        filter._id = utilService.makeId()
    })
    return filters
}

function _filter(stays: IStay[], filterBy: IFilterBy, searchBy: ISearchBy) {
    let filteredStays = stays
    if (filterBy.labels.length) {
        filteredStays = filteredStays.filter(stay => stay.labels.some(label => filterBy.labels.includes(label)))
    }
    if (searchBy.destination) {
        const searchTerm = searchBy.destination.toLowerCase()
        filteredStays = filteredStays.filter(stay => {
            const { region } = stay
            return region.toLowerCase() === searchTerm
        })
    }

    return filteredStays
}

function _initStays() {
    let stays
    let storeStays = localStorage.getItem(STAY_DB_KEY)
    stays = storeStays ? JSON.parse(storeStays) : []
    if (!stays || !stays.length) {
        stays = [...gStays]
        stays.forEach(stay => {
            stay._id = utilService.makeId()
            stay.filters = [
                utilService.getRandomItemFromArr(gFiltersName),
                utilService.getRandomItemFromArr(gFiltersName),
                utilService.getRandomItemFromArr(gFiltersName),
                utilService.getRandomItemFromArr(gFiltersName),
                utilService.getRandomItemFromArr(gFiltersName),
            ]
            stay.region = utilService.getRandomItemFromArr(gRegionsName)
        })
        localStorage.setItem(STAY_DB_KEY, JSON.stringify(stays))
    }
}

function _arrangePreviewData(stay: IStay): IStayPreview {
    return {
        _id: stay._id,
        name: stay.name,
        price: stay.price,
        imgUrls: stay.imgUrls,
        isSuperHost: stay.host.isSuperHost,
        loc: stay.loc,
        avgRate: calcAvgRate(stay.reviews),
        type: stay.type,
        filters: stay.filters,
        region: stay.region,
    }
}

function calcAvgRates(reviews: IReview[]): { [key: string]: number } {
    const avgRates: { [key: string]: number } = {}
    const numReviews = reviews.length

    reviews.forEach(review => {
        const moreRates = review.moreRate

        Object.entries(moreRates).forEach(([key, value]) => {
            avgRates[key] = avgRates[key] || 0
            avgRates[key] += value / numReviews
        })
    })

    Object.entries(avgRates).forEach(([key, value]) => {
        avgRates[key] = parseFloat(value.toFixed(1))
    })

    return avgRates
}

function getRatesSum(stayReviews: IReview[]) {
    return stayReviews.reduce((acc, review) => {
        const rates = Object.values(review.moreRate)
        let ratesSum = 0
        rates.forEach(r => (ratesSum += r))
        acc += ratesSum / rates.length
        return acc
    }, 0)
}
function calcAvgRate(stayReviews: IReview[]): string {
    if (!stayReviews.length) return '0'
    let allRatesSum = getRatesSum(stayReviews)
    return (allRatesSum / stayReviews.length).toFixed(2)
}
