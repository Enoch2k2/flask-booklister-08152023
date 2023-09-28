import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import ReviewCard from './ReviewCard';
import { useNavigate } from 'react-router-dom';

const MyReviews = () => {
  const { currentUser, loggedIn } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn, navigate])

  if(!loggedIn){ return <p>redirecting...</p> }

  const reviewCards = currentUser.reviews.map( review => <ReviewCard key={ review.id } review={ review } />)
  
  return (
    <div>
      <h1>My Reviews</h1>
      { reviewCards }
    </div>
  )
}

export default MyReviews