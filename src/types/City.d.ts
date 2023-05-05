export interface City {
    id: number,
    name: string,
    country: string,
    state: string
    cord: Cord
}

export interface Cord {
    lat: number,
    long: number
}

export interface CityMaped {
    name: string,
    country: string
}
