import React from 'react'
import {Redirect} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'



class Login extends React.Component {

  renderRedirectToOnboarding() {
    return (
      <Redirect to="/onboarding" />
    )
  }

  renderRedirectToFixtures() {
    return (
      <Redirect to="/fixtures" />
    )
  }

  renderLoginpage() {
    return (
      <div>
        <h1>Capo.</h1>
        <h2>Be the captain you were born to be.</h2>
        <button onClick={() => this.props.authenticate()}>
          <FontAwesome name="facebook-square" />Login</button>
      </div>
    )
  }

  render() {
    if (!this.props.uid) {
      return this.renderLoginpage()
    }

    if (!this.props.userBelongsToATeam) {
      return this.renderRedirectToOnboarding()
    }
    return this.renderRedirectToFixtures()
  }
}

export default Login
