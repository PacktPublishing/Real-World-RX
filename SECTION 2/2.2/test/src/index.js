import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {
  consturctor() {
    super()
    this.state = {
      counter: 0
    }
    this.addCount = this.addCount.bind(this)
    this.subCount = this.subCount.bind(this)

  }

  addCount() {
    this.setState(prevState => {
      return {counter: prevState.counter + 1}
    })
  }

  subCount() {
    this.setState(prevState => {
      return {counter: prevState.counter - 1}
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.addCount}>add</button>
        <button onClick={this.subCount}>substract</button>
        <span>{this.state.counter}</span>
      </div>
    )
  }
}

const container = document.querySelector('#root')

ReactDOM.render(<App />, container)
