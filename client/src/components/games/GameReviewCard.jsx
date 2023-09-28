import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import { headers } from '../../Globals'
import { GamesContext } from '../../context/GamesContext'

const GameReviewCard = ({review}) => {
  const { deleteReview } = useContext(GamesContext)
  const { currentUser, deleteUserReview } = useContext(UserContext)

  const handleDelete = () => {
    fetch(`/api/reviews/${ review.id }`, {
      method: "DELETE",
      headers
    })

    deleteReview(review)
    deleteUserReview(review)
  }

  return (
      <div>
        <p>{ review.user.username } says!</p>
        <p>{ review.content }</p>
        { currentUser.id === review.user.id ? (
          <>
            <Link to={`/reviews/${ review.id }/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : null }
        <hr />
      </div>
    )
}

export default GameReviewCard