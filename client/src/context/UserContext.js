import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/check_session')
      .then(resp => {
        if(resp.status == 200) {
          resp.json().then(data => login(data))
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

  return <UserContext.Provider value={{currentUser, loggedIn, login, logout}}>{ children }</UserContext.Provider>
}


export { UserContext, UserProvider }