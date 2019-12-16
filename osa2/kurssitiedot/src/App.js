import React from 'react'
import Kurssi from './components/Kurssi'

const App = ( ) => {
  const kurssit = [
    {
    nimi: 'Half Stack application development',
    osat: [
      {
        nimi: 'Fundamentals of React',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Using props to pass data',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'State of a component',
        tehtavia: 14,
        id: 3
      },
      {
        nimi: 'Redux',
        tehtavia: 11,
        id: 4
      }
    ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewares',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {kurssit.map( kurssi => <Kurssi key={kurssi.nimi} nimi={kurssi.nimi} osat={kurssi.osat}/>)}
    </div>
  )
}

export default App;
