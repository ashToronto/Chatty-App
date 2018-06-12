import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const userName = this.props.userName;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={userName} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
};

export default Chatbar;

// function Chatbar(props) {
//   return (
//     <footer className="chatbar">
//       <input className="chatbar-username" placeholder={props.userName} />
//       <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
//     </footer>
//   );
// }
//
// export default Chatbar;
