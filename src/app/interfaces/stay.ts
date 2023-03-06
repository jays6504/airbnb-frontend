import { Host } from './host'
import { IReview } from './review'
import { User } from './user'

export interface IStay {
    _id: string
    name: string
    type: string
    imgUrls: string[]
    price: number
    summary: string
    amenities: string[]
    roomType: string
    host: Host
    loc: Location
    reviews: IReview[]
    likedByUsers: User[]
    labels: string[]
    stayDetails: { [key: string]: number }
}
export interface IStayPreview {
    _id: string
    name: string
    type: string
    imgUrls: string[]
    price: number
    isSuperHost: boolean
    loc: Location
    avgRate: string
    // likedByUser: boolean;
}

interface ILocation {
    country: string
    countryCode: string
    city: string
    address: string
    lat: number
    lng: number
}

export interface ILatLngPoint {
    lat: number
    lng: number
}
