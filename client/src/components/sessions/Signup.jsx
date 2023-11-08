import React, { useContext, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { UserContext } from '../../context/UserContext';
import { headers } from '../../Globals';

const Signup = ({setError}) => {
  const { login } = useContext(UserContext)

  useEffect(() => {
    // returned functions are for clean up while unmounting the component
    return cleanup
  }, [])

  const cleanup = () => {
    setError(null)
  }
  
  const handleSubmit = values => {
    fetch('/api/signup', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(values)
    })
      .then(resp => {
        if(resp.status == 201) {
          resp.json().then(data => login(data))
        } else {
          resp.json().then(data => setError(data.error));
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
      <h1>Create Account</h1>
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

        <input type="submit" value="Signup" />
      </form>
    </div>
  )
}

export default Signup