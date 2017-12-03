import React from 'react'
import {Redirect} from 'react-router-dom'

class Home extends React.Component {

  render() {
    // console.log('userBelongsToATeam???', this.props.userBelongsToATeam)

    if (this.props.userBelongsToATeam) {
      // console.log('within Home: user does belong to a team.')
      return (
        <div>
          <h1>Home!</h1>
        </div>
      )
    } else {
      return (
        <Redirect to="/onboarding" />
      )
    }
  }
}

export default Home
