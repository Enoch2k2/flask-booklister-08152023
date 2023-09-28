import React from 'react'
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div>
      <img src={game.image_url} alt={`Image of ${game.title} case art`} width={200} height={200} />
      <h3><Link to={`/games/${game.id}`}>{ game.title }</Link></h3>
    </div>
  )
}

export default GameCard