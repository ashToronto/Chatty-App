import React, {Component} from 'react';
import Chatbar from "./Chatbar.jsx"
import Messages from "./Messages.jsx"

function mapMessageToUsername(message) {
  return message.username;
}

class App extends Component {
  constructor(props){
    super(props);
    this.createMessage = this.createMessage.bind(this);

    this.state = {
      currentUser: 'random',
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
    };
  }

  // Append user message to display, receives input from chatbar/handle input
  // Appends virtual DOM messages to the real DOM
  createMessage = (message) => {
    console.log(event)
    // Appends
    const messages = this.state.messages.concat(message);
    this.setState({messages: messages});
  }

  // Is similar to doccument.ready Only occurs once, does not repeat
  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: this.state.currentUser, content: 'Hello World'};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 2000);
}

  render() {

    let messageElements = this.state.messages.map((message, index) => {
      return <Messages key={index} myMessageProp={message} />
    });

    console.log(messageElements.length);

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
      <Chatbar createMessage={this.createMessage} userName={this.state.currentUser} />
    </div>
  }
}
export default App;
