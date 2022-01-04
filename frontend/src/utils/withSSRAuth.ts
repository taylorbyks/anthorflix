import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'
import jwt_decode from 'jwt-decode'
import api from '../services/api'

interface TokenDecoded {
  role: string
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, ...role) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    if (!cookies.token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    api.defaults.headers['Authorization'] = `Bearer ${cookies.token}`

    var decoded: TokenDecoded = jwt_decode(cookies.token)

    if (!role.includes(decoded.role)) {
      return {
        redirect: {
          destination: '/home',
          permanent: false,
        },
      }
    }

    return await fn(context)
  }
}
