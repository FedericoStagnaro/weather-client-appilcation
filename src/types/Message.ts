import { CityMaped } from './City'
import Pagination from './Pagination';

export default interface Message {
  status: number,
  message?: Pagination,
  cities?: CityMaped[]
}
