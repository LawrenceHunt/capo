import React from 'react';
import NavBar from './NavBar.jsx'

class Table extends React.Component {
  render() {
    return (
      <div className="main-container">
        <NavBar logout={this.props.logout} />

        <div>Here's a table</div>
      </div>
    )
  }
}

export default Table
