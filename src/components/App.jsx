// React
import React, { Component } from 'react';
import {Route} from 'react-router-dom'
// Firebase
import {base} from '../base'
import firebase from 'firebase';
// Components
import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import Team from './Team.jsx'
import Fixtures from './Fixtures.jsx'
import Table from './Table.jsx'
import Onboarding from './Onboarding.jsx'
import Loading from './Loading.jsx'
// default state
// import teams from '../data/teams'


class App extends Component {
  constructor() {
    super();

    this.state = {
      teams: []
    };

    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)
    this.userBelongsToATeam = this.userBelongsToATeam.bind(this)
    this.createTeam = this.createTeam.bind(this)
  }

  componentWillMount() {
    this.ref = base.syncState('teams', {
      context: this,
      state: 'teams',
      asArray: true
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  // AUTH METHODS
  authenticate() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((user) => {
      this.authHandler(null, user)
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.authHandler(null, user)
    });
  }

  authHandler(err, user) {
    if (err) console.log(err)
    this.setState({
      uid: user.uid,
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.setState({uid: null})
    }).catch((error) => console.log(error));
  }

  createTeam(teamObj) {
    const teams = [...this.state.teams]
    teams.push(teamObj)
    this.setState({
      teams
    })
  }

  userBelongsToATeam() {
    const teams = this.state.teams
    const uid = this.state.uid
    for (var i = 0; i < teams.length; i++) {
      if (teams[i].players.includes(uid)) {
        return true
      } else {
        return false
      }
    }
  }

  render() {
    if (this.state.uid === "undefined" || this.state.teams.length === 0) { return <Loading /> }

    return (
      <div className="home">

        <NavBar
          authenticate={this.authenticate}
          logout={this.logout}
          user={this.state.uid}
        />

        <Route exact path="/" render={() => (
          <Home userBelongsToATeam={this.userBelongsToATeam()} />)}
        />

        <Route path="/onboarding" render={() => (
          <Onboarding
            createTeam={this.createTeam}
            uid={this.state.uid}
          />)}
        />

        <Route path="/team" component={Team} />
        <Route path="/fixtures" component={Fixtures} />
        <Route path="/table" component={Table} />

      </div>
    );

  }
}

export default App;
