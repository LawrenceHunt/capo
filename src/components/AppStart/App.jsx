// React
import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom'
// Firebase
import {db, base} from '../../base'
import firebase from 'firebase';
// Components
// import Loading from '../Common/Loading.jsx'
import Login from './Login.jsx'
import Fixtures from '../Fixtures/Fixtures.jsx'
import Table from '../Table.jsx'
import Team from '../Home/Team.jsx'
import {HomeWithRouter} from '../Home/Home.jsx'
// import {OnboardingWithRouter} from '../Home/Onboarding.jsx'
// default state
// import teams from '../data/teams'


class App extends Component {
  constructor() {
    super();

    this.state = {
      teams: [],
      fixtures: {},
      currentlyViewingTeam: null,
      user: null
    }

    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)
    this.createTeam = this.createTeam.bind(this)
    this.createFixture = this.createFixture.bind(this)
    this.userBelongsToATeam = this.userBelongsToATeam.bind(this)
  }

  componentWillUnmount() {
    base.removeBinding(this.userRef)
  }

  // USER AUTH HANDLING...
  authenticate() {
    var provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider).then((user) => {
      this.authHandler(null, user)
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.authHandler(null, user)
    })
  }

  authHandler(err, user) {
    if (err) console.log(err)
    this.setState({uid: user.uid})
    this.checkIfUserExistsAndCreate(user)
  }

  checkIfUserExistsAndCreate(user) {
    const userRef = db.ref('users/' + user.uid)
    userRef.on('value', (snapshot) => {
      const userObj = {
        id: user.uid,
        name: user.displayName,
        profilePic: user.photoURL
      }
      if (!snapshot.val()) {
        userRef.set(userObj)
      }
    })
    // sync user state.
    this.userRef = base.syncState('users/' + user.uid, {
      context: this,
      state: 'user'
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.setState({uid: null})
    }).catch((error) => console.log(error));
    this.props.history.push("/")
  }


  // TEAMS....
  createTeam(teamObj) {
    const teams = this.state.teams
    teams[teamObj.id] = teamObj
    this.setState({
      teams
    })
    this.props.history.push("/fixtures")
  }

  // FIXTURES.....
  createFixture(fixtureObj) {
    const fixtures = {...this.state.fixtures}
    const teamId = this.state.viewingTeamId
    const teamFixtures = fixtures[teamId]
    if (!teamFixtures) {
      fixtures[teamId] = [fixtureObj]
    } else {
      teamFixtures.push(fixtureObj)
    }
    this.setState({fixtures})
  }

  userBelongsToATeam() {
    const user = this.state.user
    if (!user) return
    return Array.isArray(user.teams) && user.teams.length
  }

  render() {
    return (
      <div className="app-container">
        <Route path="/" render={ () => (
          <Login
            uid={this.state.uid}
            authenticate={this.authenticate}
            userBelongsToATeam={this.userBelongsToATeam}
          />) }
        />

      <Route path="/home" render={() => (
        <HomeWithRouter
          createTeam={this.createTeam}
          user={this.state.user}
          teams={this.state.teams}
          logout={this.logout}
        />
      )}
      />

      <Route path="/fixtures" render={() => (
        <Fixtures
          fixtures={this.state.fixtures}
          logout={this.logout}
        />
      )}
      />

        <Route path="/team" render={() => <Team logout={this.logout} />} />
        <Route path="/table" render={() => <Table logout={this.logout} /> } />
      </div>
    );
  }
}

const AppWithRouter = withRouter(App)

export default AppWithRouter;
