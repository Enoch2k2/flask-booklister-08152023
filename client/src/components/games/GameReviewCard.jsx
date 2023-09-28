import React from 'react'

const GameReviewCard = ({review}) => {
  return (
      <div>
        <p>{ review.user.username } says!</p>
        <p>{ review.content }</p>
        <hr />
      </div>
    )
}

export default GameReviewCard