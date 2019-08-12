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
      <Osa osa={props.osa1} tehtavia={props.tehtavia1} />
      <Osa osa={props.osa2} tehtavia={props.tehtavia2} />
      <Osa osa={props.osa3} tehtavia={props.tehtavia3} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.osa} osassa tehtäviä {props.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>Tehtäviä yhteensä {props.a + props.b + props.c }.</p>
    </div>
  )
}

const App = () => {
  const kurssi = 'Half Stack application development'
  const osa1 = 'Fundamentals of React'
  const tehtavia1 = 10
  const osa2 = 'Using props to pass data'
  const tehtavia2 = 7
  const osa3 = 'State of component'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} tehtavia1={tehtavia1} osa2={osa2} tehtavia2={tehtavia2}
      osa3={osa3} tehtavia3={tehtavia3} />
      <Yhteensa a={tehtavia1} b={tehtavia2} c={tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)