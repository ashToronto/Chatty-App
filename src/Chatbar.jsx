import React, {Component} from 'react';
class Chatbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      username: ''
    }
  }

  // Messages: Submit when keyboard enter is clicked pass message data to app.jsx
  handleSubmit = (event) => {
    if (event.key == 'Enter') {
      console.log("works")
      const message = {
        username: this.props.currentUser,
        content: event.target.value
      }
      this.props.createMessage(message);
      event.target.value = ''
    }
  }

  // Messages: changes state when message is being written
  handleOnChange = (event) => {
    this.setState({message: event.target.value});
  }

  // User Name Handlers
  handleNameChange = (event) => {
    console.log("handleNameChange", event)
    this.props.notification(event.target.value);
  }

  // chatbar FORM
  render() {
    return (<footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.currentUser} onBlur={this.handleNameChange}/>
      <input className="chatbar-message" value={this.state.content} onChange={this.handleOnChange} onKeyPress={this.handleSubmit}/>
    </footer>);
  }
};

export default Chatbar;
