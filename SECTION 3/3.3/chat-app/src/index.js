import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import take from 'lodash/take'
import shuffle from 'lodash/shuffle'

const createRandomNickname = () => {
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return take(shuffle(possible), 6).join('')
}

const container = document.querySelector('#root')
ReactDOM.render(<App nickname={createRandomNickname()} />, container)
