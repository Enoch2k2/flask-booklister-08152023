import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
  const { loggedIn, logout } = useContext(UserContext)

  const handleLogout = e => {
    e.preventDefault();
    fetch('/api/logout', {
      method: "DELETE"
    })
    logout()
  }

  const displayedLinks = loggedIn ? <>
    <li><Link to="#" onClick={ handleLogout }>Logout</Link></li>
    <li><Link to="/games">Games</Link></li>
    <li><Link to="/games/new">Create Game</Link></li>
    <li><Link to="/my-reviews">My Reviews</Link></li>
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