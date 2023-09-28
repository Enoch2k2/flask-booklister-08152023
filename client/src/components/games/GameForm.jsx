import React, { useContext, useState } from 'react'
import { headers } from '../../Globals'
import { GamesContext } from '../../context/GamesContext'
import { useNavigate } from 'react-router-dom';


const GameForm = () => {
  const { addGame } = useContext(GamesContext);

  const navigate = useNavigate()

  const [state, setState] = useState({
    title: "",
    image_url: "",
    description: ""
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    fetch('/api/games', {
      method: "POST",
      headers,
      body: JSON.stringify(state)
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

  return (
    <div>
      <h1>Create Game</h1>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={ state.title } onChange={ handleChange } />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" value={ state.description } onChange={ handleChange }  />
        </div>
        <div>
          <label htmlFor="image_url">Image Url</label>
          <input type="text" name="image_url" id="image_url" value={ state.image_url } onChange={ handleChange }  />
        </div>

        <input type="submit" value="Create Game" />
      </form>
    </div>
  )
}

export default GameForm