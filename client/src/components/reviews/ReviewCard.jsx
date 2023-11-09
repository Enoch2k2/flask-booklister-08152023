import React from 'react'

const ReviewCard = ({ review }) => {
  return (
    <div>
      <h3>{ review.game.title }</h3>
      <img src={review.game.image_url} alt={`${review.game.title} case art`} />
      <hr />
      <h4>Review:</h4>
      <p>{ review.content }</p>
      <hr />
    </div>
  )
}

export default ReviewCard