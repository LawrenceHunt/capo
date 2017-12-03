// React
import React, { Component } from 'react';
import {Route} from 'react-router-dom'
// Firebase
import {base} from '../base'
import firebase from 'firebase';

// Components
import NavBar from './NavBar'
import Home from './Home'
import Team from './Team'
import Fixtures from './Fixtures'
import Table from './Table'
// default state
// import teams from '../data/teams'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // <- set up react state

    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)
  }

  // AUTH METHODS
  authenticate() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((authData) => {
      this.authHandler(null, authData)
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('A USER IS HERE MUTHAFUCKA', user)
        this.authHandler(null, user)
      } else {
        console.log('no user signed in!!!')
      }
    });
  }

  authHandler(err, user) {
    if (err) {
      console.log(err)
    }
    this.setState({
      uid: user.uid,
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.setState({uid: null})
    }).catch(function(error) {
      console.log(error)
    });
  }

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



  render() {
    return (
      <div className="home">
        <NavBar
          authenticate={this.authenticate}
          logout={this.logout}
          user={this.state.uid}
        />
        <Route path="/" component={Home} />
        <Route path="/team" component={Team} />
        <Route path="/fixtures" component={Fixtures} />
        <Route path="/table" component={Table} />
      </div>
    );
  }
}

export default App;
