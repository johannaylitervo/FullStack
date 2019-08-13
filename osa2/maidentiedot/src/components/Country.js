import React from 'react'

const Country = ({name, capital, population, languages, flag}) => {
    
    return (
        <div>
            <h3> {name} </h3>
            <p> Capital {capital} </p>
            <p> Population {population} </p>
            <h4>Languages</h4>
             { languages.map(language => <li key={language.name} >
                                    {language.name} </li>)}
            <img src={flag} alt="Flag" width="300"/>
           
        </div>
    )
}

export default Country