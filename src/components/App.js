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
    // provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user)
    });
  }
  //
  // componentDidMount() {
  //   base.onAuth((user) => {
  //     if(user) {
  //       this.authHandler(null, { user })
  //     }
  //   })
  // }

  authHandler(err, authData) {
    if (err) {
      console.log(err)
    }
    console.log('authData coming from authHandler: ', authData)

    // const storeRef = base.database().ref(this.props.storeId)

    // storeRef.once('value', (snapshot) => {
    //   const data = snapshot.val() || {}
    //   if (!data.owner) {
    //     storeRef.set({
    //       owner: authData.user.uid
    //     })
    //   }
    this.setState({
      uid: authData.user.uid,
    })
    // })
  }

  logout() {
    base.unauth()
    this.setState({
      uid: null
    })
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
