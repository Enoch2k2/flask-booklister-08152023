import { useContext, useState } from 'react';
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
import EditReview from './components/reviews/EditReview';
import Errors from './components/Errors';

function App() {
  const { loading } = useContext(LoadingContext);
  const [error, setError] = useState(null);

  return (
    <Router>
        <UserProvider>
          <GamesProvider>
            <Navbar />
            <Errors error={ error } />
            { loading ? <h1>Loading...</h1> :
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup setError={ setError } />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="/games/new" element={<GameForm />} />
              <Route path="/games" element={<GameList />} />
              <Route path="/games/:id" element={<GameDetails />} />
              <Route path="/reviews/:id/edit" element={<EditReview />} />
            </Routes> }
          </GamesProvider>
        </UserProvider>
    </Router>
  );
}

export default App;
