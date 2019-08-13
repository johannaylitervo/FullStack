import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country';
import CountryList from './components/CountryList';


const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const handleClickCountry = (event) => {
    event.preventDefault()
    const name = event.target.getAttribute("name").toLowerCase()
    setFilter(name)
   }

  const getCountries = () => {
    let copy = [...countries]
    
    return copy.filter(country => country.name.toLowerCase().includes(filter))
  }
  console.log(getCountries())


  
  return (
      <div>
        <h1>Countries</h1>
      
        <Filter value={filter} handler={handleFilterChange}/>
        <CountryList countries={getCountries()} handleOnClick={handleClickCountry} />
      </div>
  )

}

export default App;
