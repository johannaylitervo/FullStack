import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [0,0,0,0,0,0]
    }
  }

  aanesta = () => {
    const kopio = [...this.state.pisteet]
    kopio[this.state.selected] = kopio[this.state.selected] + 1

    this.setState({ pisteet: kopio })
  }

  render() {
    
    const most = this.state.pisteet.indexOf(Math.max(...this.state.pisteet))
    return (
     
      <div>
        <h3>Anecdote of the day</h3>
        {this.props.anecdotes[this.state.selected]}
      <br/>
        <Button handleClick={() => this.setState({selected: Math.floor(Math.random() * 6)})} text={'Next anecdote'}/>
        <Button handleClick={() => this.aanesta()} text={'Vote'}/>
      
        <h3>Anecdote with most votes</h3>
        {this.props.anecdotes[most]}
        <p> has {this.state.pisteet[most]} votes.</p>
      </div>
    
        

    )
    
    
  }
  
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]




const Button = ({handleClick, text}) => {
   
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)