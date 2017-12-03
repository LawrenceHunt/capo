// React
import React, { Component } from 'react';
import {Route} from 'react-router-dom'
// Firebase
import {base} from '../base'
// Components
import NavBar from './NavBar'
import Home from './Home'
import Team from './Team'
import Fixtures from './Fixtures'
import Table from './Table'
// default state
import teams from '../data/teams'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }

  // componentWillMount(){
  //   /* Create reference to messages in Firebase Database */
  //   let messagesRef = db.ref('messages').orderByKey().limitToLast(100);
  //   messagesRef.on('child_added', snapshot => {
  //     /* Update React state when message is added at Firebase Database */
  //     let message = { text: snapshot.val(), id: snapshot.key };
  //     this.setState({ messages: [message].concat(this.state.messages) });
  //   })
  // }

  componentWillMount() {
    this.ref = base.syncState('messages', {
      context: this,
      state: 'messages',
      asArray: true
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

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
      <div className="home">
        <NavBar />

        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
        <Route path="/team" component={Team} />
        <Route path="/fixtures" component={Fixtures} />
        <Route path="/table" component={Table} />


      </div>
    );
  }
}

export default App;
