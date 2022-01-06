import { createContext } from 'react'
import api from '../services/api'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../models'

interface Response {
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
  user: User
  errorMessage: string | null
}

interface AuthProviderProps {
  children: React.ReactNode
}

let authChannel: BroadcastChannel

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  console.log('Logout')

  destroyCookie(undefined, 'token')

  authChannel.postMessage('signOut')
  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User)
  const [errorMessage, setErrorMessage] = useState('')
  let isAuthenticated = !!user

  function signOut() {
    console.log('Logout')

    destroyCookie(undefined, 'token')

    authChannel.postMessage('signOut')
    Router.push('/')
  }

  async function getUser() {
    try {
      const request = await api.get('/profile')

      const user = request.data as User

      setUser(user)
    } catch (error) {
      signOut()
    }
  }

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          destroyCookie(undefined, 'token')
          Router.push('/')
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { token } = parseCookies()

    if (token) {
      getUser()
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const request = await api.post('login', {
        email,
        password,
      })

      const { token } = request.data as Response

      setCookie(undefined, 'token', token, {
        maxAge: 24 * 60 * 60, // 1 day
        path: '/',
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      isAuthenticated = true

      getUser()

      Router.push('/home')

    } catch (error) {
      console.log(error)
      if (error.response) {
        setErrorMessage(error.response.data.error)
      }
      setErrorMessage('Não foi possível conectar ao servidor')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
