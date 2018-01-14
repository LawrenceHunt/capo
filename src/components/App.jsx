// React
import React, { Component } from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom'
// Firebase
import {db, base} from '../base'
import firebase from 'firebase';
// Components
import Loading from './Loading.jsx'
import Login from './Login.jsx'
import Team from './Team.jsx'
import Fixtures from './Fixtures.jsx'
import Table from './Table.jsx'
import {OnboardingWithRouter} from './Onboarding.jsx'
// default state
// import teams from '../data/teams'


class App extends Component {
  constructor() {
    super();

    this.state = {
      // loading: true,
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
  }


  //
  // componentWillMount() {
  //   this.teamsRef = base.syncState('teams', {
  //     context: this,
  //     state: 'teams',
  //
  //     then: () => {
  //       this.fixturesRef = base.syncState('fixtures', {
  //         context: this,
  //         state: 'fixtures',
  //         then: () => {
  //           this.setState({loading: false})
  //         }
  //       })
  //     }
  //   })
  // }
  //
  // componentWillUnmount() {
  //   base.removeBinding(this.teamsRef)
  //   base.removeBinding(this.fixturesRef)
  // }


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

  //
  // goToTeamOrOnboarding(uid) {
  //   const userRef = db.ref('users/' + uid)
  //   userRef.on('value', (snapshot) => {
  //     const user = snapshot.val()
  //     const teams = user.teams
  //     if (teams && teams.length) {
  //       this.props.history.push(`/teams/${teams[0]}`)
  //     } else {
  //       this.props.history.push(`/onboarding`)
  //     }
  //   }, function(errorObject) {
  //     console.log('could not find' + errorObject.code)
  //   })
  // }

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
    // if (this.state.loading) return <Loading />
    return (
      <div className="app-container">
        <Route path="/" render={() => (
            <Redirect to={"/login"}/>
          )}
        />

        <Route path="/login" render={ () => (
          <Login
            uid={this.state.uid}
            currentlyViewingTeam={this.state.currentlyViewingTeam}
            authenticate={this.authenticate}
          />) }
        />

        <Route path="/onboarding" render={() => (
          <OnboardingWithRouter
            createTeam={this.createTeam}
            uid={this.state.uid}
            teams={this.state.teams}
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
