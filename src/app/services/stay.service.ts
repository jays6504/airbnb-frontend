import { IFilter, IFilterBy } from '../interfaces/filter'
import { ISearchBy } from '../interfaces/search'
import { IReview } from '../interfaces/review'
import { IStay } from '../interfaces/stay'
import { utilService } from './util.service'
import { httpService } from './http.service'

const API_KEY = 'stay'

export const stayService = {
    loadStays,
    loadStayById,
    getDefaultSearch,
    loadFilters,
    getSearchFromParams,
    calcAvgRate,
    calcAvgRates,
    getDefaultFilter,
}

async function loadStays(
    searchBy: ISearchBy = getDefaultSearch(),
    filterBy: IFilterBy = getDefaultFilter(),
    pageIdx = 0
) {
    try {
        return await httpService.get(API_KEY, { pageIdx, filterBy, searchBy })
    } catch (err) {
        console.log('err:', err)
    }
}

async function loadStayById(stayId: string) {
    try {
        return (await httpService.get(API_KEY + `/${stayId}`)) as IStay
    } catch (err) {
        console.log('err:', err)
    }
    // return storageService.get(STAY_DB_KEY, stayId) as Promise<IStay>
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

async function loadFilters() {
    try {
        return (await httpService.get(API_KEY + '/filters')) as IFilter[]
    } catch (err) {
        console.log('err:', err)
    }
    // let filters = [...gFilters]
    // filters.forEach(filter => {
    //     filter._id = utilService.makeId()
    // })
    // return filters
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
