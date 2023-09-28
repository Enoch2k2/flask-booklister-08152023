import React, { useContext } from 'react'
import { GamesContext } from '../../context/GamesContext'
import GameCard from './GameCard';

const GameList = () => {
  const { games } = useContext(GamesContext);

  const gameCards = games.map(game => <GameCard key={ game.id } game={ game } />)

  return (
    <div>
      <h1>Game List</h1>
      { gameCards }
    </div>
  )
}

export default GameList