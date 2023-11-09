import React, { useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { UserContext } from '../../context/UserContext'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = values => {
    fetch('/api/login', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(values)
    })
      .then(resp => {
        if(resp.status === 200) {
          resp.json().then(data => {
            login(data)
            navigate("/")
          })
        } else {
          resp.json().then(data => console.log(data.error));
        }
      })
  }
  
  const schema = yup.object({
    username: yup.string().min(3).required(),
    password: yup.string().required()
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: handleSubmit
  })

  const displayErrors = (error) => {
    return error ? <p style={{ color: "red" }}>{ error }</p> : null
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={ formik.values.username } onChange={ formik.handleChange } />
          { displayErrors(formik.errors.username) }
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={ formik.values.password } onChange={ formik.handleChange } />
          { displayErrors(formik.errors.password) }
        </div>


        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login