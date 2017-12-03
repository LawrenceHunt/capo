import React from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {

  renderLogin() {
    return this.props.user ? (
      <nav className="login">
        <h2>Logout</h2>
        <button className="facebook"
          onClick={() => this.props.logout()}
        >Log the fuck out</button>
      </nav>
    ) : (
      <nav className="login">
        <h2>Login</h2>
        <button className="facebook"
          onClick={() => this.props.authenticate()}
        >Log in with Facebook</button>
      </nav>
    )
  }

  render() {
    return (

      <nav>
        <div className="nav-bar">
          {this.renderLogin()}
          <div className="nav-item"><Link to='/team'>Team</Link></div>
          <div className="nav-item"><Link to='/table'>Table</Link></div>
          <div className="nav-item"><Link to='/fixtures'>Fixtures</Link></div>
          <div className="nav-item"><Link to='/'>Home</Link></div>
        </div>
      </nav>
    )
  }

}
