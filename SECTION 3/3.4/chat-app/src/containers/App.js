import React, { Component } from 'react'
import ChatPane from './ChatPane'
import AppBar from '../components/AppBar'
import UserList from '../components/UserList'
import { Observable } from 'rxjs/Observable'
import io from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userlist: [],
      messages: []
    }
  }

  componentDidMount() {
    const socket = io('http://localhost:4000')

    const socketIdStream = Observable.create(observer => {
      socket.on('my socketId', data => {
        observer.next(data)
      })
    })

    socketIdStream.subscribe(data => {
      socket.emit('client connect', {
        nickname: this.props.nickname,
        socketId: data.socketId,
        connectTime: data.connectTime
      })
    })

    const socketAllUsersStream = Observable.create(observer => {
      socket.on('all users', data => {
        observer.next(data)
      })
    })

    socketAllUsersStream.subscribe(data => {
      this.setState({ userlist: data })
    })

    const socketMessageStream = Observable.create(observer => {
      socket.on('message', data => {
        observer.next(data)
      })
    })

    socketMessageStream.subscribe(data => {
      this.setState(({ messages }) => ({
        messages: [...messages, data]
      }))
    })
  }

  render() {
    return (
      <div>
        <AppBar />
        <div className="row">
          <div className="col s6">
            <ChatPane
              data={{
                nickname: this.props.nickname,
                messages: this.state.messages
              }}
            />
          </div>
          <div className="col s6"><UserList userlist={this.state.userlist} /></div>
        </div>
      </div>
    )
  }
}

export default App
