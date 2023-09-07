import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/static/Home';
import Signup from './components/sessions/Signup';
import Login from './components/sessions/Login';
import Navbar from './components/static/Navbar';
import { UserProvider } from './context/UserContext';
import { GamesProvider } from './context/GamesContext';

function App() {  
  return (
    <Router>
      <UserProvider>
        <GamesProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </GamesProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
