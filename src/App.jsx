import React, {Component} from 'react';
import Chatbar from "./Chatbar.jsx"
import Messages from "./Messages.jsx"

class App extends Component {
  constructor(props) {
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      currentUser: 'A random user',
      messages: [] // Messages from the server will save here
    };
  }
  // Is similar to doccument.ready Only occurs once, does not repeat
  componentDidMount() { //document ready
    // connecting to our websocket
    this.ws = new WebSocket('ws://localhost:3001/');
    // Send a message to the server
    this.ws.onmessage = (rawMessage) => {
      const parsedMessage = JSON.parse(rawMessage.data);
      this.createMessage({
        id: parsedMessage.id,
        ...parsedMessage.content
      });

      // let messages = this.state.messages.concat(outgoingMsg);
      // this.setState({messages: messages});
    }
    // Setting an example
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: this.state.currentUser,
        content: 'Hello World'
      };
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 2000);
  }

  // Append user message to display, receives input from chatbar/handle input
  // Appends virtual DOM messages to the real DOM
  createMessage = (message) => {
    const messages = this.state.messages.concat(message);
    this.setState({messages});
  }

  user = (event) => {
    const names = this.state.currentUser.concat(event)
    this.setState({names})
  }

  // Defining the object to passed to server
  sendMessage(message) {
    let outgoingMsg = {
      type: "message",
      username: this.state.currentUser,
      content: message
    };
    this.ws.send(JSON.stringify(outgoingMsg));
  }

  render() {
    let messageElements = this.state.messages.map((message, index) => {
      return <Messages key={index} myMessageProp={message}/>
    });

    return <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <main className="messages">
        {messageElements}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
      <Chatbar createMessage={this.sendMessage} changeUser={this.user}/>
    </div>
  }
}
export default App;
