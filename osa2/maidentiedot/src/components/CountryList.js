import React from 'react'
import Country from './Country'


const CountryList = ({countries, handleOnClick}) => {
    if(countries.length === 1) {
        console.log(countries[0].name)
        return (
            <Country key={countries[0].name} name={countries[0].name} capital={countries[0].capital} population={countries[0].population} languages={countries[0].languages} flag={countries[0].flag}/>
        )
    }
    if(countries.length <= 9) {
        return (
            <div>
                { countries.map(country => <li key={country.name} onClick={handleOnClick}>
                                    {country.name}<button name={country.name} onClick={handleOnClick} >show</button>
                                     </li> 
                 )}
            </div>
        )
        
    }
    if(countries.length>9){
        return (
            <p> 
                Too many matches, specify another filter.
            </p>
        )
    }

    return (
        <div></div>
    )
}

export default CountryList