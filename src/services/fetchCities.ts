import axios from "axios"

import { City, CityMaped } from "../types/City";
import Message from "../types/Message";

const url = 'https://bulk.openweathermap.org/sample/city.list.json.gz'
const cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/'

const fetchCitiesUnziped = async (): Promise<Array<City>> => {

    try {
        const { data } = await axios.get("localhost:3000", {
            responseType: 'arraybuffer',
            decompress: true
        })

    } catch (error) {
        console.log("could not fetch gzip json", error);
        return []
    }
}


export const getCityNames = async (): Promise<Array<CityMaped>> => {
    console.log("getting");

    const unziped: Array<City> = await fetchCitiesUnziped()

    if (unziped.length) {
        const maped = unziped.map((city: City) => {
            return { name: city.name, country: city.country }
        })
        return maped
    }
    return []
}

export const fetchCities = async (name: string = "", page: number = 1): Promise<Message| null> => {
    const url = `http://localhost:3000/cities?page=${page}&offset=10&limit=10&name=${name}`
    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.error(error);
        return null
    }
}