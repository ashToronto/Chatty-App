import React, {Component} from 'react';

class notification extends Component {
  render() {
    const message = this.props.myMessageProp;

    return (
      <div className="notification">
        <span className="message-username">{ message.username }</span>
        <span className="message-content">{ message.content }</span>
      </div>
    );
  }
};
export default Message;
