import React, { useEffect, useState } from 'react';
import Box from './components/Box'
import { CityMaped } from './types/City';
import { Unit } from './types/Units';
import { fetchCities } from './services/fetchCities';
import Message from './types/Message'
import Pagination from './types/Pagination';
import { fetchTemperature } from './services/fetchTemperature';


const test = [{ name: 'op1', country: 'op1' }, { name: 'op2', country: 'op2' }, { name: 'op3', country: 'op3' }]

export interface IAppProps {
}

export interface IAppState {
  cities: Array<CityMaped>,
  citySelected: string,
  unitSelected: Unit,
  temperature: number
}

export default function App(props: IAppProps) {
  const [query, setQuery] = useState<string>("");
  const [city, setCity] = useState<CityMaped>(null);
  const [cities, setCities] = useState<CityMaped[]>(null);
  const [pagination, setPagination] = useState<Pagination>(null);
  const [currentPage, setCurrentPage] = useState<number>();
  const [temperature, setTemperature] = useState<number>(null);


  useEffect(() => {
    fetchCities(query)
      .then((data: Message) => {
        const { cities, message } = data;
        setCities(cities)
        setPagination(message)
        cities.length && setCity(cities[0])
        const urlParams = new URLSearchParams(message.page)
        const numberPage: number = parseInt(urlParams.get("page") as string, 10);
        setCurrentPage(numberPage)
      })

  }, [query])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    fetchTemperature(`${city.name},${city.country}`)
      .then((response: any) => {
        setTemperature(response.data)
      })
  }

  function handleQuery(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.currentTarget.value)
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>): void {
    setCity(JSON.parse(e.currentTarget.value))
  }

  function handleNextPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, movement: number): void {
    e.preventDefault()
    const finalMovement = (((currentPage + movement) > pagination.count) || ((currentPage + movement) === 0)) ? currentPage : currentPage + movement;
    if (finalMovement === currentPage) return
    fetchCities(query, finalMovement)
      .then((data: Message) => {
        const { cities, message } = data;
        setCities(cities)
        setPagination(message)
        cities.length && setCity(cities[0])
        const urlParams = new URLSearchParams(message.page)
        const numberPage: number = parseInt(urlParams.get("page") as string, 10);
        setCurrentPage(numberPage)
      })

  }

  function resetTemperature(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    setTemperature(null)
    throw new Error('Function not implemented.');
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-slate-800'>
      <Box>
        <div className='h-96 '>

          <div className='text-center mb-5'>
            <h2 className='text-5xl font-light drop-shadow-2xl'>Weather Application</h2>
          </div>


          {temperature &&
            <div className=' grid place-items-center h-full'>
              <p className=' text-2xl'>
                The average temperature of your city is
              </p> 
              <p className='font-bold text-2xl'> <span>{temperature} Celsius</span></p>
              <button onClick={(e) => resetTemperature(e)} className='text-gray-50 text-2xl p-4 rounded-lg bg-slate-600 '> Select another city</button>
            </div>
          }
          {
            !temperature && <div className='grid grid-rows-6 row  h-full'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" autoComplete='false' value={query} onChange={(e) => handleQuery(e)} placeholder='Search your city' className='m-2 w-full row-span-1 block' />

                <select size={11} tabIndex={0} value={JSON.stringify(city)} onChange={(e) => handleSelect(e)} className=' text-center m-2 w-full '>
                  <optgroup label='Select one '>
                    {cities && cities.map((c, index) => <option key={index} value={JSON.stringify(c)}>{parseCity(c)}</option>)}
                  </optgroup>
                </select>


                <div className='grid grid-cols-6 my-3 mx-3'>
                  <button onClick={(e) => handleNextPage(e, -1)} className='font-extrabold text-xl col-span-1 rounded-full bg-slate-600 text-gray-50' >{'<'}</button>
                  <div className='col-span-4 text-center'><p> {currentPage} | {pagination?.count} </p></div>
                  <button onClick={(e) => handleNextPage(e, 1)} className='font-extrabold text-xl col-span-1 rounded-full bg-slate-600 text-gray-50'>{'>'}</button>
                </div>

                <div className='m-2 grid grid-cols-2'>
                  <button type='submit' className='text-gray-50 text-2xl col-span-1  rounded-lg bg-slate-600 '>
                    Submit
                  </button>
                  <h3 className=' text-center col-span-1'>City: {city && parseCity(city)}</h3>
                </div>

              </form>
            </div>
          }



        </div>
      </Box>
    </div>
  );
}

const parseCity = (city: CityMaped): string => {
  return `${city.name} | ${city.country}`
}
