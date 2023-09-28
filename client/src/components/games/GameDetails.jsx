import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GamesContext } from '../../context/GamesContext'
import GameReviewCard from './GameReviewCard'
import ReviewForm from '../reviews/ReviewForm'

const GameDetails = () => {
  const { id } = useParams()
  const { games } = useContext(GamesContext)
  // const games = useSelector(store => store.games.games )

  const game = games.find( game => game.id === parseInt(id, 10))

  const gameReviewCards = game.reviews.map(review => <GameReviewCard key={ review.id } review={ review } />)

  return (
    <div>
      <h1>{ game.title }</h1>
      <img src={ game.image_url } alt={`Image of ${game.title} case art`} />
      <p>{ game.description }</p>
      <div>
        <h3>Create a Review</h3>
        <ReviewForm game={ game } />
        <hr />
        <h3>Reviews</h3>
        { gameReviewCards }
      </div>
    </div>
  )
}

export default GameDetails