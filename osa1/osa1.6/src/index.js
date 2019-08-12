import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }

    yhteensa() {
        return (this.state.hyva + this.state.huono + this.state.neutraali)
    }

    keskiarvoita() {
        if(this.state.hyva === 0 && this.state.huono === 0 && this.state.neutraali ===0) {
            return 0
        }
        return (this.state.hyva - this.state.huono) / (this.state.hyva+this.state.neutraali + this.state.huono)
    }

    maaritaPositiiviset() {
        if(this.state.hyva === 0 && this.state.huono === 0 && this.state.neutraali ===0) {
            return 0
        }
        return ((this.state.hyva / (this.state.hyva+this.state.neutraali + this.state.huono) * 100) +  ' %')
    }
    
    render() {

        return (
            <div>
            
                <h1>Give feedback</h1>

                <Button 
                    handleClick={() => this.setState({hyva: this.state.hyva + 1})} 
                    text="good"
                />
                <Button 
                    handleClick={() => this.setState({neutraali: this.state.neutraali + 1})}
                    text="neutral"
                />
                <Button 
                    handleClick={() => this.setState({huono: this.state.huono + 1})}
                    text="bad"
                />
                
                <h1>Statistics</h1>

                
            
            
            <Statistics state={this.state} yhteensa={this.yhteensa()} keskiarvo={this.keskiarvoita()} positiiviset={this.maaritaPositiiviset()}/>
            </div>
            
        )

    }
}

const Button= ({handleClick, text}) => {
    return (
        <button onClick={handleClick} >{text}</button>
    )
}

const Statistics= ({state, yhteensa, keskiarvo, positiiviset}) => {
    if(state.hyva === 0 && state.huono === 0 && state.neutraali ===0) {
        return ('No feedback given.')
    }

    return (
       
            <table>
                
            <Statistic text="good" arvo={state.hyva} />
            <Statistic text="neutral" arvo={state.neutraali} />
            <Statistic text="bad" arvo={state.huono} />
            <Statistic text="all" arvo={yhteensa} />
            <Statistic text="average" arvo={keskiarvo} />
            <Statistic text="ppositive" arvo={positiiviset} />
            </table>
        
      
       
    )
}

const Statistic= ({text, arvo}) => {
    return (
        <tbody>
            <tr> 
                <td>{text}</td> 
                <td>{arvo}</td>
            </tr>
        </tbody>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
