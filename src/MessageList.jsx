import React from 'react'
import Message from './Message.jsx'

const MessageList = (props) => (
  this.props.messages.map((message, index) => {
    if (message.type === 'message'){
      return <Message key={index} myMessageProp={message}/>
    } else if (message.type === 'postMessage'){
      return <Notification key={index} myMessageProp={message}/>
    }
  })
);
export default MessageList;
