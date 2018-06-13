import React, {Component} from 'react';
class Chatbar extends Component {
constructor(props){
  super(props)
  this.state = {
    message: '',
    username: this.props.userName
  }
}

  // Submit when keyboard enter is clicked pass message data to app.jsx
  handleSubmit = (event) => {
      if (event.key == 'Enter'){
        console.log("works")
        const message = {
          username: this.state.username,
          content: this.state.message
        }
        this.props.createMessage(message);
      }
    }

// changes state when message is being written
    handleOnChange = (event) => {
          this.setState({message: event.target.value});
          console.log(event.target.value)
      }

// chatbar FORM
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username} onKeyPress={this.handleSubmit}/>
        <input className="chatbar-message" value={this.state.content} onChange={this.handleOnChange} onKeyPress={this.handleSubmit} />
      </footer>
    );
  }
};

export default Chatbar;
