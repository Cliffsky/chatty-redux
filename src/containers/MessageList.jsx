import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Message from '../components/Message.jsx';

class MessageList extends Component {
  renderMessage(message) {
    return (
      <Message
        key={message.id}
        style={message.color}
        notification={message.notification}
        username={message.username}
        content={message.content} />
    );
  }

  render() {
    return(
      <div id="message-list">
        {this.props.messages.map(this.renderMessage.bind(this))}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { messages: state.messages }
}

export default connect(mapStateToProps)(MessageList);