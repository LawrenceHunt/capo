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
      <div className="login-container">
        <div className="login-main">
          <div className="login-header">
            <div className="title">
              <img className="logo" alt="logo-white" src="/images/capo-logo-white.png"/>
              <h1>Capo</h1>
            </div>
            <h4>Be the captain you were born to be.</h4>
          </div>
          <div className="login-controls">
          <button
            className="login-btn btn-large"
            onClick={() => this.props.authenticate()}>
            <FontAwesome name="facebook-square" size="2x"/>
            <h3>Login</h3>
          </button>
        </div>
      </div>
    </div>
    )
  }

  render() {
    if (!this.props.user) return this.renderLoginpage()

    if (!this.props.userBelongsToATeam) {
      return this.renderRedirectToOnboarding()
    }

    // return this.renderRedirectToFixtures()
  }
}

export default Login
