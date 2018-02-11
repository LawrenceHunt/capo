import React from 'react'
import {withRouter} from 'react-router-dom'
import NavBar from '../Common/NavBar.jsx'
import Loading from '../Common/Loading.jsx'
import Onboarding from './Onboarding.jsx'

class Home extends React.Component {

  render() {
    if (!this.props.user || !this.props.user.name) return <Loading />


    const userName = this.props.user.name.split(" ")[0]

    const onboarding = (
      <Onboarding
      />
    )

    return (
      <div className="main-container">
        <NavBar logout={this.props.logout} />
        <div>
          <h2>Welcome, {userName}.</h2>
        </div>
        {onboarding}
      </div>
    )
  }
}

export const HomeWithRouter = withRouter(Home)
