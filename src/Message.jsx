import React, {Component} from 'react';

class Messages extends Component {
  render() {
    const message = this.props.myMessageProp;
    const messageClass = message.type == "postNotification" ? "message system" : "message"

    return (
      <div>
        <span className="message-username">{ message.username }</span>
        <span className="message-content">{ message.content }</span>
          <div className="message system">
            <span className={messageClass}></span>
          </div>
      </div>
    );
  }
};
export default Messages;
