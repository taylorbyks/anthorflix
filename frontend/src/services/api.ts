import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { signOut } from '../contexts/AuthContext'

const { token } = parseCookies()

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

api.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      signOut()
    }
    return Promise.reject(error)
  },
)

export default api
