import React, {Component} from 'react';
import Chatbar from "./Chatbar.jsx"
import Message from "./Message.jsx"

class App extends Component {
  constructor(props) {
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.notification = this.notification.bind(this);

    this.state = {
      currentUser: 'Anonymous',
      messages: [], // Messages from the server will save here
      userCount: 1
    };
  }
  // Is similar to doccument.ready Only occurs once, does not repeat
  componentDidMount() { //document ready
    // connecting to our websocket
    this.ws = new WebSocket('ws://localhost:3001/');
    // Send a message to the server
    this.ws.onmessage = (rawMessage) => {
      const parsedMessage = JSON.parse(rawMessage.data);
      console.log(parsedMessage)
      // Segragates data based on if it is a: notif; message
      // Also adds user count
      switch (parsedMessage.type) {
        case "postMessage":
          // handle incoming message
          this.createMessage({
            id: parsedMessage.id,
            type: 'postMessage',
            ...parsedMessage.content
          });
          break;
        case "postNotification":
          // handle incoming notification
          this.createMessage({id: parsedMessage.id, type: parsedMessage.type, content: parsedMessage.content});
          break;
        case "clientSize":
        this.setState({userCount: parsedMessage.clientSize})
      }
    }
  }

  // Append user message to display, receives input from chatbar/handle input
  // Appends virtual DOM messages to the real DOM
  createMessage = (message) => {
    const messages = this.state.messages.concat(message);
    this.setState({messages});
  }

  changeName = (newName) => {
    // const names = this.state.currentUser.concat(event)
    this.setState({currentUser: newName})
  }

  // Defining the object to passed to server setting it's type
  sendMessage(message) {
    let outgoingMsg = {
      type: "postMessage",
      username: this.state.currentUser,
      content: message
    };
    this.ws.send(JSON.stringify(outgoingMsg));
    console.log('message: ', message)
  }

  // Send notification data and set it's type
  notification(username) {
    if (this.state.currentUser !== username) {
      let notif = {
        type: 'postNotification',
        content: this.state.currentUser + ' has changed their username to: ' + username
      };
      this.ws.send(JSON.stringify(notif));
      this.setState({currentUser: username});
    }
  }

  render() {
    let messageElements = this.state.messages.map((message, index) => {
      return <Message key={index} myMessageProp={message}/>
    });

    return <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">The Chatter Box</a>
        <p className = "userCount">Online: {this.state.userCount}</p>
      </nav>
      <main className="messages">
        {messageElements}
      </main>
      <Chatbar currentUser={this.state.currentUser} createMessage={this.sendMessage} changeName={this.changeName} notification={this.notification}/>
    </div>
  }
}
export default App;
