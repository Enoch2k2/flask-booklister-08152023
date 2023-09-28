import React, { useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { headers, showFormikError } from '../../Globals'
import { GamesContext } from '../../context/GamesContext'
import { useNavigate } from 'react-router-dom'

const EditReview = () => {
  const { currentUser, editUserReview } = useContext(UserContext)
  const { editReview } = useContext(GamesContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const review = currentUser.reviews?.find(review => review.id === parseInt(id))

  const initialValues = {
    content: review.content
  }

  const validationSchema = yup.object({
    content: yup.string().required()
  })

  const handleSubmit = values => {
    fetch(`/api/reviews/${review.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(values)
    })
      .then(resp => {
        if(resp.status === 200) {
          resp.json().then(updatedReview => {
            editReview(updatedReview)
            editUserReview(updatedReview)
            navigate(`/games/${review.game_id}`)
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
    <div>
      <h1>Edit Review</h1>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <textarea name="content" id="content" value={ formik.values.content } onChange={ formik.handleChange } rows={10} cols={70} />
          { showFormikError(formik.errors.content) }
        </div>

        <input type="submit" value="Edit Review" />
      </form>
    </div>
  )
}

export default EditReview