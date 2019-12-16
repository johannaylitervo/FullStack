import React from 'react'

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.nimi}</h1>
      </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

const Sisalto = ({osat}) => {
    return (
    <div>
        {osat.map( osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia}/>)}
    </div>
    )
}

const Yhteensa = ({osat}) => {
    return (
        <h4> Total of {osat.reduce((summa, osa) =>
                summa + osa.tehtavia, 0)} exercises
        </h4>
        
    )
}


const Kurssi = ({nimi, osat}) => {
    return (
       <div>
           <Otsikko nimi={nimi}/>
           <Sisalto osat={osat}/>
           <Yhteensa osat={osat}/>
       </div>
       
    )
  }

  export default Kurssi