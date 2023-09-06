import React, { useState } from 'react'

const Signup = ({ login }) => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    login(values)
  }

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={ values.username } onChange={ handleChange } />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={ values.password } onChange={ handleChange } />
        </div>

        <input type="submit" value="Signup" />
      </form>
    </div>
  )
}

export default Signup