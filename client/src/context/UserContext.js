import { createContext, useState, useEffect, useContext } from "react";
import { LoadingContext } from "./LoadingContext";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const { setLoading } = useContext(LoadingContext)
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/check_session')
      .then(resp => {
        if(resp.status == 200) {
          resp.json().then(data => {
            login(data)
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
  }, [])

  const login = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
  }

  const logout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  }

  const addUserReview = (review) => {
    const updatedReviews = [...currentUser.reviews, review] // add data, spread operator
    const editedUser = {
      ...currentUser,
      reviews: updatedReviews
    }

    setCurrentUser(editedUser)
  }

  return <UserContext.Provider value={{currentUser, loggedIn, login, logout, addUserReview }}>{ children }</UserContext.Provider>
}


export { UserContext, UserProvider }