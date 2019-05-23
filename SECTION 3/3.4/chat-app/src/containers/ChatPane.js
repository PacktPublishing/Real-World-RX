import React, { Component } from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/merge';
import axios from 'axios';
import format from 'date-fns/format';

class ChatPane extends Component {
  componentDidMount() {
    const button = document.querySelector('#sendBtn');
    const textField = document.querySelector('#message-input');

    const clickStream = Observable.fromEvent(button, 'click').map(e => true);
    const enterKeyPressedStream = Observable.fromEvent(
      textField,
      'keyup'
    ).filter(e => e.keyCode === 13);
    const textEnteredStream = Observable.fromEvent(textField, 'keyup').map(
      e => e.target.value
    );
    const sendMessageStream = Observable.merge(
      clickStream,
      enterKeyPressedStream
    );

    const mergedStream = textEnteredStream.takeUntil(sendMessageStream);

    let text = '';
    const onNext = t => {
      text = t;
    };
    const onError = e => {};
    const onComplete = () => {
      axios.post('http://localhost:4000/message', {
        message: text,
        who: this.props.data.nickname,
        timestamp: Date.now(),
      });
      textField.value = '';
      textField.focus();
      mergedStream.subscribe(onNext, onError, onComplete);
    };

    mergedStream.subscribe(onNext, onError, onComplete);
  }

  render() {
    return (
      <div>
        <h4>Your nickname is {this.props.data.nickname}</h4>
        <ul className="collection">
          {this.props.data.messages.map((message, index) => {
            return (
              <li className="collection-item" key={message.timestamp}>
                <span className="title">
                  {message.who}
                  {' '}
                  <i>
                    {format(
                      parseInt(message.timestamp, 10),
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  </i>
                </span>
                <p>
                  <strong>{message.message}</strong>
                </p>
              </li>
            );
          })}
        </ul>
        <div className="row">
          <div className="input-field col s10">
            <input
              id="message-input"
              type="text"
              className="validate"
              ref="message"
            />
            <label className="active" htmlFor="message-input">
              enter message here
            </label>
          </div>
          <div className="input-field col s2">
            <button
              id="sendBtn"
              type="submit"
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="material-icons">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const messageBox = document.querySelector('#message-input').innerHTML


<form className="row" >
          <div className="input-field col s10">
            <input
              id="message-input"
              type="text"
              className="validate"
              ref="message"
            />
            <label className="active" htmlFor="message-input">
              enter message here
            </label>
          </div>
          <div className="input-field col s2">
            <button
              id="sendBtn"
              type="submit"
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="material-icons">send</i>
            </button>
          </div>
        </form>













export default ChatPane;
