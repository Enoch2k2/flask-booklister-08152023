import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/static/Home';
import Signup from './components/sessions/Signup';
import Login from './components/sessions/Login';
import Navbar from './components/static/Navbar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
  }

  const logout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  }
  
  return (
    <Router>
      <Navbar logout={ logout } loggedIn={ loggedIn } />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup login={ login } />} />
        <Route path="/login" element={<Login login={ login } />} />
      </Routes>
    </Router>
  );
}

export default App;
