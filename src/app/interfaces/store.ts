import { IFilterBy } from './filter'
import { IStayPreview } from './stay'

export interface IAction {
    [key: string]: any
    type: string
}
