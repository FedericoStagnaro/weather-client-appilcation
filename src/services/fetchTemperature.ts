import axios from 'axios'
import { Unit } from '../types/Units'

export const fetchTemperature = async (city : string, unit: Unit = "metric") => {
    try {
        return await axios.post('http://localhost:3000/weather', {
            city,
            unit
        })
    } catch (error) {
        throw new Error(error)
    }
}