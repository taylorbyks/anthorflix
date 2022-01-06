import {
  Flex,
  Box,
  Button,
  Icon,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Header, Sidebar, MoviesList, Stars } from '../../components'
import api from '../../services/api'
import { useQuery } from 'react-query'
import { Movie, ResponseRatings } from '../../models'
import { withSSRAuth } from '../../utils/withSSRAuth'
import omdbApi from '../../services/omdbApi'

export default function Users() {
  const toast = useToast()

  async function handleRemove(id: string) {
    try {
      await api.delete(`/ratings/${id}`)

      refetch()

      toast({
        title: 'Avaliação removida',
        status: 'success',
        isClosable: true,
        position: 'bottom-right',
      })
    } catch (error) {
      toast({
        title: 'Erro ao remover avaliação',
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
      })
    }
  }

  const { data, isLoading, error, refetch } = useQuery(
    'myRatings',
    async () => {
      const response: ResponseRatings = await api.get('/ratings/my')

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
                  <Button
                    onClick={() => handleRemove(rating.id)}
                    leftIcon={<Icon as={RiDeleteBin5Line} />}
                    colorScheme="red"
                  >
                    Remover
                  </Button>
                </Stack>
              </Box>
            ),
          } as Movie
        }),
      )

      return movies
    },
  )

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
