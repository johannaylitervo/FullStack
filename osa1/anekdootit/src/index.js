import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button type="button" onClick={handleClick}>{text}</button>
  )
}

const points = new Array(6).fill(0)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  /** Finding the index of the anecdote with most votes. */
  const most = points.indexOf(Math.max(...points))

  return (

    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      
      <Button handleClick={() => voteAnecdote()} text={"Vote"}/>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6 ))} text={"Next anecdote"}/>
      <div>
        <h2>Anecdote with the most votes</h2>
        {anecdotes[most]}
      </div>
      <div>
        has {points[most]} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)