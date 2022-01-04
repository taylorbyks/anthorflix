import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    if (cookies.token) {
      return {
        redirect: {
          destination: '/predictions',
          permanent: false,
        },
      }
    }

    return await fn(context)
  }
}
