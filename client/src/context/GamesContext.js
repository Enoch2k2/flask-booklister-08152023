import { createContext, useState } from "react";

const GamesContext = createContext([]);

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([])

  return <GamesContext.Provider value={{ games }}>{ children }</GamesContext.Provider>
}

export { GamesContext, GamesProvider };