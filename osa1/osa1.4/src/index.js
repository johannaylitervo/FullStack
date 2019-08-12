import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )

}

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osat[0].nimi} tehtavia={props.osat[0].tehtavia}/>
      <Osa osa={props.osat[1].nimi} tehtavia={props.osat[1].tehtavia} />
      <Osa osa={props.osat[2].nimi} tehtavia={props.osat[2].tehtavia} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.osa} has {props.tehtavia} exercises.</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>Number of exercises combined is {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia}.</p>
    </div>
  )
}

const App = () => {
  const kurssi = {
      
    nimi: 'Half Stack application development',
    osat: [
    {
      nimi: 'Fundamentals of React',
      tehtavia: 10
    },
    {
      nimi: 'Using props to pass data',
      tehtavia: 7
    },
    {
      nimi: 'State of components',
      tehtavia: 14
    }
  ]
}
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)