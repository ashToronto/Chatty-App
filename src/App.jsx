import React, {Component} from 'react';
import Chatbar from "./Chatbar.jsx"
import Messages from "./Messages.jsx"

function mapMessageToUsername(message) {
  return message.username;
}

class App extends Component {
  constructor(props){
    super(props);
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

  render() {
    // let messageElements = this.state.messages.map((message, index) => {
    //   return <Messages key={index} message={this.state.messages[index]} />
    // });

    let messageElements = this.state.messages.map((message, index) => {
      return <Messages key={index} myMessageProp={message} />
    });

    // mapResult = this.state.messages.map(function (message) {
    //   return message.username;
    // });
    //
    // this.state.messages.map((message) => {
    //   return message.username;
    // });
    //
    // this.state.messages.map(message => {
    //   return message.username;
    // });
    //
    // this.state.messages.map(message => message.username);

    console.log(messageElements.length);

    return <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <main className="messages">
        {/* <Messages messages = {this.state.messages} index={0} /> */}
        {messageElements}
        <div className="message system">
          // Anonymous1 changed their name to nomnom.
        </div>
      </main>
      <Chatbar userName={this.state.currentUser} />
    </div>
  }
}
export default App;
