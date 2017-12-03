import React from 'react'
import {Redirect} from 'react-router-dom'

const Home = (props) => {
  if (props.userBelongsToATeam) {
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

export default Home
