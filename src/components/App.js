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
import Onboarding from './Onboarding'
// default state
// import teams from '../data/teams'


class App extends Component {
  constructor(props) {
    super(props);

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
    firebase.auth().signInWithPopup(provider).then((authData) => {
      this.authHandler(null, authData)
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler(null, user)
      } else {
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
      if (teams[i].players.indexOf(uid) > -1) {
        return true
      } else {
        return false
      }
    }
  }

  renderLoading() {
    return (
      <div>Loading!!!</div>
    )
  }

  render() {
    if (this.state.uid === "undefined" || this.state.teams.length === 0) { return this.renderLoading() }

    const userBelongsToATeam = this.userBelongsToATeam()

    const OnboardingWithProps = () => (
      <Onboarding
        createTeam={this.createTeam}
        uid={this.state.uid}
      />
    )
    const HomeWithProps = () => (
      <Home
        userBelongsToATeam={userBelongsToATeam}
      />
    )

    return (
      <div className="home">
        <NavBar
          authenticate={this.authenticate}
          logout={this.logout}
          user={this.state.uid}
        />
        <Route exact path="/" component={HomeWithProps} />
        <Route path="/onboarding" component={OnboardingWithProps}/>
        <Route path="/team" component={Team} />
        <Route path="/fixtures" component={Fixtures} />
        <Route path="/table" component={Table} />
      </div>
    );

  }
}

export default App;
