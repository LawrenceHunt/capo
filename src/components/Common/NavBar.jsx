import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

export default class NavBar extends React.Component {

  render() {
    const logout = (
      <a className="nav-item"
        onClick={() => this.props.logout()}
      ><FontAwesome name="sign-out" size="2x"/></a>
    )

    return (
      <nav>
        <div className="nav-bar">
          <div className="nav-item"><Link to='/team'><img className="nav-team-logo" src="images/Logo_Battersinaikos.png" alt="team-logo"/></Link></div>
          <div className="nav-item"><Link to='/table'><FontAwesome name="table" size="2x" /></Link></div>
          <div className="nav-item"><Link to='/fixtures'><FontAwesome name="futbol-o" size="2x"/></Link></div>
          {logout}
        </div>
      </nav>
    )
  }

}
