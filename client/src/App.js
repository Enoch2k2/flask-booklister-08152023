import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/static/Home';
import Signup from './components/sessions/Signup';
import Login from './components/sessions/Login';
import Navbar from './components/static/Navbar';
import MyReviews from './components/reviews/MyReviews';
import { UserProvider } from './context/UserContext';
import { GamesProvider } from './context/GamesContext';
import { LoadingContext } from './context/LoadingContext';
import GameForm from './components/games/GameForm';
import GameList from './components/games/GameList';
import GameDetails from './components/games/GameDetails';

function App() {
  const { loading } = useContext(LoadingContext);

  return (
    <Router>
        <UserProvider>
          <GamesProvider>
            <Navbar />
            { loading ? <h1>Loading...</h1> :
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="/games/new" element={<GameForm />} />
              <Route path="/games" element={<GameList />} />
              <Route path="/games/:id" element={<GameDetails />} />
            </Routes> }
          </GamesProvider>
        </UserProvider>
    </Router>
  );
}

export default App;
