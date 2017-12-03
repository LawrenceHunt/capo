import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => (
  <nav>
    <div className="nav-bar">
      <div className="nav-item"><Link to='/team'>Team</Link></div>
      <div className="nav-item"><Link to='/table'>Table</Link></div>
      <div className="nav-item"><Link to='/fixtures'>Fixtures</Link></div>
      <div className="nav-item"><Link to='/'>Home</Link></div>
    </div>
  </nav>
)

export default NavBar
