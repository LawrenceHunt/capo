import React from 'react'

import NavBar from './NavBar.jsx'
import Fixture from './Fixture'
import FixtureForm from './FixtureForm.jsx'
import FontAwesome from 'react-fontawesome'
// import moment from 'moment'

class Fixtures extends React.Component {

  constructor() {
    super()

    this.state = {
      makingNewFixture: false
    }
  }

  // currentlyViewingFixtureIndex: this.props.fixtures.length
  // ? this.props.fixtures.length - 1
  // : null

  showFixtureForm() {
    this.setState({makingNewFixture: true})
  }

  cancelFixtureForm() {
    this.setState({makingNewFixture: false})
  }

  render() {

    return (
      <div className="main-container">
        <NavBar logout={this.props.logout} />

        <div className="fixtures-control left">
          <button className="btn-large btn-outline">
            <FontAwesome name="chevron-left" size="2x"/>
          </button>
        </div>

        <div className="fixtures-container">

          <div className="fixtures-toolbar">
            {
              this.state.makingNewFixture ? (
                <button
                  className="btn-large btn-outline"
                  onClick={() => this.cancelFixtureForm()}
                >Cancel</button>
              ) : (
                <button
                  className="btn-large btn-outline"
                  onClick={() => this.showFixtureForm()}
                ><FontAwesome name="plus" />New Fixture</button>
              )
            }
          </div>

          {
            this.state.makingNewFixture ?
            ( <FixtureForm /> ) :
            ( <Fixture /> )
          }

        </div>

        <div className="fixtures-control right">
          <button className="btn-large btn-outline">
            <FontAwesome name="chevron-right" size="2x"/>
          </button>
        </div>
      </div>
    )
  }
}

export default Fixtures
