import { IFilterBy } from '../interfaces/filter'
import { IReview } from '../interfaces/review'
import { IStayPreview, IStay } from '../interfaces/stay'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const AMOUNT_TO_DISPLAY = 20
const STAY_DB_KEY = 'stayDB'
var gStays: IStay[] = require('../../assets/data/minified-stays.json')
_initStays()

export const stayService = { query, getDefaultFilter }

function query(filterBy: IFilterBy = getDefaultFilter(), staysToDisplay: number = AMOUNT_TO_DISPLAY) {
    return storageService.query(STAY_DB_KEY, staysToDisplay)
}

function getDefaultFilter(): IFilterBy {
    return {
        destination: '',
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
        startDate: null,
        endDate: null,
        labels: [],
        guests: 0,
    }
}

function _filter(stays: IStay[], filterBy: IFilterBy) {
    let filteredStays = stays
    if (filterBy.labels.length) {
        filteredStays = stays.filter(stay => stay.labels.some(label => filterBy.labels.includes(label)))
    }

    return filteredStays
}

function _initStays() {
    let stays
    let storeStays = localStorage.getItem(STAY_DB_KEY)
    stays = storeStays ? JSON.parse(storeStays) : []
    if (!stays || !stays.length) {
        stays = gStays.map((s: IStay) => <IStayPreview>_arrangePreviewData(s))
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
