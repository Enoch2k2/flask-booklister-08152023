import React, { useContext } from 'react'
import { headers, showFormikError } from '../../Globals';
import { GamesContext } from '../../context/GamesContext';
import { UserContext } from '../../context/UserContext';
import * as yup from 'yup'
import { useFormik } from 'formik'

const ReviewForm = ({ game }) => {
  const { addReview } = useContext(GamesContext);
  const { addUserReview } = useContext(UserContext);

  const initialValues = {
    content: ''
  }

  const validationSchema = yup.object({
    content: yup.string().required()
  })

  const handleSubmit = values => {

    const gameData = {
      game_id: game.id,
      content: values.content
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  return (
    <form onSubmit={ formik.handleSubmit }>
      <textarea name="content" id="content" value={ formik.values.content } onChange={ formik.handleChange } rows={10} cols={70} />
      { showFormikError(formik.errors.content) }
      <br />
      <input type="submit" value="Create Review" />
    </form>
  )
}

export default ReviewForm



// game_id = data.get("game_id")
// content = data.get("content")