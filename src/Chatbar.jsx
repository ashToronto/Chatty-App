import React, {Component} from 'react';
class Chatbar extends Component {
constructor(props){
  super(props)
  this.state = {
    message: '',
    username: ''
  }
}

  // Messages: Submit when keyboard enter is clicked pass message data to app.jsx
  handleSubmit = (event) => {
      if (event.key == 'Enter'){
        console.log("works")
        const message = {
          username: this.state.username,
          content: this.state.message
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
      handleOnChangeName = (event) => {
        console.log("handleOnChangeName", event)
          if (event.key === 'Enter') {
            if (this.state.username === null) {
              this.state.username = 'Anonymous';
            }
            this.state.username = event.target.value;
            // this.props.user(username);
          }
        }

        handleOnChangeUser = (event) => {
          console.log("handleOnChangeUser", event)
              this.setState({username: event.target.value});
          }

// chatbar FORM
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username} onChange={this.handleOnChangeUser} onKeyPress={this.handleOnChangeName}/>
        <input className="chatbar-message" value={this.state.content} onChange={this.handleOnChange} onKeyPress={this.handleSubmit} />
      </footer>
    );
  }
};

export default Chatbar;
