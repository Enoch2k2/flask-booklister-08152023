import React from 'react'
import { showFormikError } from '../Globals'

const Errors = ({ error }) => {
  return (
    <>
    { showFormikError(error) }
    </>
  )
}

export default Errors