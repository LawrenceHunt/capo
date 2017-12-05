import React from 'react'
import NavBar from './NavBar.jsx'
import FontAwesome from 'react-fontawesome'

class Fixtures extends React.Component {




  render() {
    return (
      <div className="main-container">
        <NavBar logout={this.props.logout} />

        <div className="fixtures-container">
          <div className="fixtures-header">
            <button><FontAwesome name="chevron-left"/></button>
          </div>
        </div>


      </div>
    )
  }
}

export default Fixtures
