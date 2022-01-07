import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { Header, MoviesList, Sidebar, Stars } from '../../components'
import { Movie, ResponseRatings } from '../../models'
import api from '../../services/api'
import omdbApi from '../../services/omdbApi'
import { withSSRAuth } from '../../utils/withSSRAuth'

export default function Users() {
  const { data, isLoading, error } = useQuery('ratings', async () => {
    const response: ResponseRatings = await api.get('/ratings')

    const movies = Promise.all(
      response.data.map(async rating => {
        const movie = await omdbApi.getById(rating.movie)
        return {
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          imdbID: movie.imdbID,
          description: movie.Plot,
          footer: (
            <Box flex="1" align="center">
              <Stack spacing="2" align="center">
                <Text color="white">"{rating.review}"</Text>
                <Stars score={rating.score} />
                <Text color="white">Avaliação de: {rating.user.name}</Text>
              </Stack>
            </Box>
          ),
        } as Movie
      }),
    )

    return movies
  })

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1488} mx="auto" px="6">
        <Sidebar />
        <MoviesList movies={data} isLoading={isLoading} error={error} />
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async context => {
  return {
    props: {},
  }
})
