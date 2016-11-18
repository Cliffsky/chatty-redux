import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newMessage, setUsername } from '../actions/index.jsx';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { messageInputValue: '', usernameInputValue: '', conservedUsername: '' };
  }

  freezeUsername(event) {
    this.setState({ conservedUsername: event.target.value });
  }

  handleMessageInput(event) {
    this.setState({ messageInputValue: event.target.value})
  }

  handleUsernameInput(event) {
    this.setState({ usernameInputValue: event.target.value})
  }

  onMessageSubmit(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageInputValue);
      this.setState({ messageInputValue: '' });
    }
  }

  onUserUpdate(event) {
    if(this.state.username !== this.state.conservedUsername) {
      this.props.setUsername({
        username: this.state.usernameInputValue
      });
    }
  }

  render() {
    return(
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onFocus={this.freezeUsername.bind(this)}
          onChange={this.handleUsernameInput.bind(this)} />
        <button
          onClick={this.onUserUpdate.bind(this)}>
          Submit
        </button>
        <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit Enter"
        value={this.state.messageInputValue}
        onKeyUp={this.onMessageSubmit.bind(this)}
        onChange={this.handleMessageInput.bind(this)} />
      </footer>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { setUsername, newMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChatBar);