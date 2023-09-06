import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ loggedIn, logout }) => {

  const handleLogout = e => {
    e.preventDefault();

    logout()
  }

  const displayedLinks = loggedIn ? <>
    <li><Link to="#" onClick={ handleLogout }>Logout</Link></li>
    <li>Games</li>
    <li>My Reviews</li>
  </> : <>
    <li><Link to="/signup">Signup</Link></li>
    <li><Link to="/login">Login</Link></li>
  </>

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      { displayedLinks }
    </ul>
  )
}

export default Navbar