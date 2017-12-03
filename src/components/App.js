import React, { Component } from 'react';
// import fire from './fire';
// import {base} from './base'
import Header from './Header'
import Main from './Main'
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { messages: [] }; // <- set up react state
  // }
  // componentWillMount(){
  //   /* Create reference to messages in Firebase Database */
  //   let messagesRef = db.ref('messages').orderByKey().limitToLast(100);
  //   messagesRef.on('child_added', snapshot => {
  //     /* Update React state when message is added at Firebase Database */
  //     let message = { text: snapshot.val(), id: snapshot.key };
  //     this.setState({ messages: [message].concat(this.state.messages) });
  //   })
  // }
  //
  // componentWillMount() {
  //   this.ref = base.syncState('messages', {
  //     context: this,
  //     state: 'messages',
  //     asArray: true
  //   })
  // }
  //
  // componentWillUnmount() {
  //   base.removeBinding(this.ref)
  // }
  //
  // addMessage(e) {
  //   e.preventDefault()
  //   const messages = [...this.state.messages]
  //   const timestamp = Date.now()
  //   messages.push({
  //     text: this.inputEl.value,
  //     id: timestamp
  //   })
  //   this.setState({messages})
  //   this.inputEl.value = ''
  // }

  // addMessage(e){
  //   e.preventDefault(); // <- prevent form submit from reloading the page
  //   /* Send the message to Firebase */
  //   db.ref('messages').push( this.inputEl.value );
  //   this.inputEl.value = ''; // <- clear the input
  // }

  // <form onSubmit={this.addMessage.bind(this)}>
  // <input type="text" ref={ el => this.inputEl = el }/>
  // <input type="submit"/>
  // <ul>
  // { /* Render the list of messages */
  //   this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
  // }
  // </ul>
  // </form>

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
