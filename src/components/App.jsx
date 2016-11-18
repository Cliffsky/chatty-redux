import React, {Component} from 'react';
import Nav from '../containers/Nav.jsx';
import MessageList from '../containers/MessageList.jsx';
import ChatBar from '../containers/ChatBar.jsx';

export default class App extends Component {
  render() {
    return(
      <div className="wrapper">
        <Nav />
        <MessageList />
        <ChatBar />
      </div>
    )
  }
}