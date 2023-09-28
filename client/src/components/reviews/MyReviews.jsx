import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import ReviewCard from './ReviewCard';

const MyReviews = () => {
  const { currentUser } = useContext(UserContext);

  const reviewCards = currentUser.reviews.map( review => <ReviewCard key={ review.id } review={ review } />)
  
  return (
    <div>
      <h1>My Reviews</h1>
      { reviewCards }
    </div>
  )
}

export default MyReviews