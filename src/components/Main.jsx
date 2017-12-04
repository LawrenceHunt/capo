import React from 'react'
import {Route} from 'react-router-dom'

import NavBar from './NavBar.jsx'
import Team from './Team.jsx'
import Fixtures from './Fixtures.jsx'
import Table from './Table.jsx'


class Main extends React.Component {

  render() {
    return (
      <div className="home">
        <NavBar logout={this.logout}/>

        <Route path="/team" component={Team} />
        <Route path="/fixtures" component={Fixtures} />
        <Route path="/table" component={Table} />

      </div>
    )
  }
}

export default Main
