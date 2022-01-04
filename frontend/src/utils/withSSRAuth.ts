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

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
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

    return await fn(context)
  }
}
