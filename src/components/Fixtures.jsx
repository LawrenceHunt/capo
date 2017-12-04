import React from 'react';
import NavBar from './NavBar.jsx'

class Fixtures extends React.Component {
  render() {
    return (
      <div className="main-container">
        <NavBar logout={this.props.logout} />
        <div>Here are fixtures</div>
      </div>
    )
  }
}

export default Fixtures
