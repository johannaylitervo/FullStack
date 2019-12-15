import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic= ({text, arvo}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {arvo} </td>
    </tr>
  )
}

const Statistics= ({all, good, neutral, bad}) => {

  if(all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text="good" arvo={good}/>
            <Statistic text="neutral" arvo={neutral}/>
            <Statistic text="bad" arvo={bad}/>

            <Statistic text="all" arvo={good+neutral+bad}/>
            <Statistic text="average" arvo={ (good - bad)/(good + neutral + bad) }/>
            <Statistic text="positive" arvo={`${good/(good + neutral + bad)*100}%`}/> 
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return (
      <div>No feedback given</div>
    )
  }
}

const Button= ({handleClick, text}) => {
  return (
    <button type="button" onClick={handleClick}>{text}</button>

  )
}

const App = () => {

  //Nappien tilat
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = (good + neutral + bad)
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />

      <h1>Statistics</h1>
      <Statistics all={all} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
  
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)