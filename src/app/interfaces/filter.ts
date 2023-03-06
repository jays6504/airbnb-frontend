export interface IFilter {
    title: string
    img: string
    _id: string
}
export interface IFilterBy {
    [key: string]: string | number | Date | null | string[]
    destination: string
    adults: number
    children: number
    infants: number
    pets: number
    guests: number
    startDate: Date | null
    endDate: Date | null
    labels: string[]
}
