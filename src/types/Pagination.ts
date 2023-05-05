export default interface Pagination {
  page: string,
  next: string | null,
  previus: string | null,
  lastpage: string | null,
  count: number
}
