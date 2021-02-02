import { setAuthorizationToken } from './commonFuncs'

import axios from 'axios'

export function login (credentials) {
  return new Promise ((res, rej) => {
    axios.post('/api/auth/login', credentials)
      .then((response) => {
        setAuthorizationToken(response.data.access_token)
        res(response.data)
      })
      .catch((err) => {
        console.error(err)
        rej('Wrong email or password')
      })
  })
}

export function getLocalUser () {
  const userStr = localStorage.getItem('loggedUser')

  if (!userStr) {
    return null
  }

  return JSON.parse(userStr)
}
