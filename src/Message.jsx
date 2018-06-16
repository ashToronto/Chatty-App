import React, {Component} from 'react';

class Messages extends Component {
  render() {
    const message = this.props.myMessageProp;

    if (message.type === "postMessage") {
      return (<div className="message">
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>)
    } else if (message.type == "postNotification") {
      return (<div className="message system">
        {message.content}
      </div>)
    } else {
      return (<div>
        error
      </div>)
    }
  }
};
export default Messages;
