// React
import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom'
// Firebase
import {db, base} from '../base'
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
      fixtures: {},
      currentlyViewingTeam: null
    }

    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)
    this.assignTeamIfUserBelongs = this.assignTeamIfUserBelongs.bind(this)
    this.createTeam = this.createTeam.bind(this)
    this.createFixture = this.createFixture.bind(this)
  }

  componentWillMount() {
    this.teamsRef = base.syncState('teams', {
      context: this,
      state: 'teams',

      then: () => {
        this.fixturesRef = base.syncState('fixtures', {
          context: this,
          state: 'fixtures',
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
    console.log(user)
    const uid = user.uid
    this.setState({
      uid
    }, this.assignTeamIfUserBelongs(uid))
  }

  checkIfUserExists(uid) {

  }

  assignTeamIfUserBelongs(uid) {
    const teams = this.state.teams
    const teamKeys = Object.keys(teams)

    for (var i = 0; i < teamKeys.length; i++) {
      if (teams[teamKeys[i]].player_ids.includes(uid)) {
        this.setState({currentlyViewingTeam: teamKeys[i]})
      }
    }
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
    const teams = db.ref('teams')
    teams.on('value', function(snapshot) {
      console.log(snapshot.val())
    }, function(errorObject) {
      console.log("Fail: ", errorObject.code)
    })
    return (
      <div className="app-container">
        <Route path="/" render={ () => (
          <Login
            uid={this.state.uid}
            currentlyViewingTeam={this.state.currentlyViewingTeam}
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
