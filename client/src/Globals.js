export const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}


export const showFormikError = error => {
  return error ? <p style={{color: 'red'}}>{error}</p> : null
}