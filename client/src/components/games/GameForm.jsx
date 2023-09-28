import React, { useContext } from 'react'
import { headers, showFormikError } from '../../Globals'
import { GamesContext } from '../../context/GamesContext'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik'


const GameForm = () => {
  const { addGame } = useContext(GamesContext);

  const navigate = useNavigate()

  const initialValues = {
    title: "",
    image_url: "",
    description: ""
  }

  const validationSchema = yup.object({
    title: yup.string().required(),
    image_url: yup.string(),
    description: yup.string()
  })

  const handleSubmit = values => {

    fetch('/api/games', {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    })
      .then(resp => {
        if(resp.status === 201) {
          resp.json().then(data => {
            addGame(data)
            navigate('/games')
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
      <h1>Create Game</h1>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={ formik.values.title } onChange={ formik.handleChange } />
          { showFormikError( formik.errors.title ) }
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" value={ formik.values.description } onChange={ formik.handleChange }  />
          { showFormikError( formik.errors.description ) }
        </div>
        <div>
          <label htmlFor="image_url">Image Url</label>
          <input type="text" name="image_url" id="image_url" value={ formik.values.image_url } onChange={ formik.handleChange }  />
          { showFormikError( formik.errors.image_url ) }
        </div>

        <input type="submit" value="Create Game" />
      </form>
    </div>
  )
}

export default GameForm