// React
import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom'
// Firebase
import {base} from '../base'
import firebase from 'firebase';
// Components
import Loading from './Loading.jsx'
import Login from './Login.jsx'
import Team from './Team.jsx'
import Fixtures from './Fixtures.jsx'
import Table from './Table.jsx'
import Onboarding from './Onboarding.jsx'
// default state
// import teams from '../data/teams'


class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      teams: [],
      fixtures: []
    }

    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)
    this.userBelongsToATeam = this.userBelongsToATeam.bind(this)
    this.createTeam = this.createTeam.bind(this)
  }

  componentWillMount() {
    this.teamsRef = base.syncState('teams', {
      context: this,
      state: 'teams',
      asArray: true,
      then: () => {
        this.fixturesRef = base.syncState('fixtures', {
          context: this,
          state: 'fixtures',
          asArray: true,
          then: () => {
            this.setState({loading: false})
          }
        })
      }
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.teamsRef)
    base.removeBinding(this.fixturesRef)
  }

  // AUTH METHODS
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
    this.setState({
      uid: user.uid,
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.setState({uid: null})
    }).catch((error) => console.log(error));
    this.props.history.push("/")
  }

  createTeam(teamObj) {
    const teams = this.state.teams
    teams.push(teamObj)
    this.setState({
      teams
    })
    this.props.history.push("/fixtures")
  }

  userBelongsToATeam() {
    const teams = this.state.teams
    const uid = this.state.uid
    let belongs = false
    teams.forEach((team) => {
      team.players.forEach((player) => {
        if (player.id === uid) {
          belongs = true
        }
      })
    })
    return belongs
  }

  render() {
    if (this.state.loading) return <Loading />

    return (
      <div>
        <Route path="/" render={ () => (
          <Login
            uid={this.state.uid}
            userBelongsToATeam={this.userBelongsToATeam()}
            authenticate={this.authenticate}
          />) }
        />

        <Route path="/onboarding" render={() => (
          <Onboarding
            createTeam={this.createTeam}
            uid={this.state.uid}
            teams={this.state.teams}
          />
        )}
        />

      <Route path="/fixtures" render={() => (
        <Fixtures
          fixures={this.state.fixtures}
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
