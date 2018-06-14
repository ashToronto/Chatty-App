import React, {Component} from 'react';

class Messages extends Component {
  render() {
    const message = this.props.myMessageProp;

    return (
      <div className="message">
        <span className="message-username">{ message.username }</span>
        <span className="message-content">{ message.content }</span>
      </div>
    );
  }
};
export default Messages;
