import { Flex, Box, Spinner, Text } from '@chakra-ui/react'
import { ReactNode } from 'toasted-notes/node_modules/@types/react'
import { Movie } from '../../models'
import { MovieCard } from '../index'

interface MoviesListProps {
  movies: Movie[]
  isLoading?: boolean
  error?: any
}

export default function MoviesList({
  movies = [],
  isLoading = false,
  error = false,
}: MoviesListProps) {
  if (isLoading) {
    return (
      <Flex mt="10" justify="center" flex="1">
        <Spinner />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex mt="10" justify="center" flex="1">
        <Text color="gray.300">
          Falha ao buscar dados, caso o erro persista entre em contato.
        </Text>
      </Flex>
    )
  }

  if (movies.length === 0) {
    return (
      <Flex mt="10" justify="center" flex="1">
        <Text color="gray.300">
          Busque por um filme para começar a adicionar a sua lista.
        </Text>
      </Flex>
    )
  }

  return (
    <Box
      flex="1"
      borderRadius={8}
      p="8"
    >
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </Box>
  )
}
