import React, {Component} from 'react';
// var sanitizeHtml = require('sanitize-html');

class Message extends Component {

  render() {
    let cssRule = {
      color: this.props.style
    };
    if (this.props.content) {
      return(
        <div className="message">
          <span className="username" style={cssRule}>{this.props.username}</span>
          <span className="content"><div dangerouslySetInnerHTML={this.props.content} /></span>
        </div>
      );
    } else if (this.props.notification) {
      return(
        <div className="message system">
          <span className="system">{this.props.notification}</span>
        </div>
      );
    } else {
      throw new Error("invalid transmission.")
    }
  }
}

export default Message;