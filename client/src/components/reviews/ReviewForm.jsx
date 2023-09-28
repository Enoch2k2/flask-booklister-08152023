import React, { useContext, useState } from 'react'
import { headers } from '../../Globals';
import { GamesContext } from '../../context/GamesContext';
import { UserContext } from '../../context/UserContext';

const ReviewForm = ({ game }) => {
  const [content, setContent] = useState("")
  const { addReview } = useContext(GamesContext);
  const { addUserReview } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();

    const gameData = {
      game_id: game.id,
      content
    }

    fetch('/api/reviews', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(gameData)
    })
      .then(resp => {
        // GameContext
        // UserContext
        if(resp.status === 201) {
          resp.json().then(review => {
            addReview(game, review)
            addUserReview(review)
          })
        }
      })
  }



  return (
    <form onSubmit={ handleSubmit }>
      <textarea name="content" id="content" value={ content } onChange={ e => setContent( e.target.value ) } rows={10} cols={70} />
      <br />
      <input type="submit" value="Create Review" />
    </form>
  )
}

export default ReviewForm



// game_id = data.get("game_id")
// content = data.get("content")