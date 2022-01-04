import {
  Flex,
  Box,
  Button,
  Icon,
  ModalBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  Stack,
  useToast,
  FormLabel,
  Image,
  Heading,
  Text,
  Slider,
  Textarea,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import { RiAddLine, RiEditLine } from 'react-icons/ri'
import { Header, Sidebar } from '../../components'
import Link from 'next/link'
import { AuthContext } from '../../contexts/AuthContext'
import { ReactNode } from 'toasted-notes/node_modules/@types/react'
import api from '../../services/api'
import { useState, useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { User, ResponseUsers, Movie, ResponseRatings } from '../../models'
import { withSSRAuth } from '../../utils/withSSRAuth'
import omdbApi from '../../services/omdbApi'
import MoviesList from '../../components/MovieList'

export default function Users() {
  const { data, isLoading, error } = useQuery('movies', async () => {
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
            <>
              <Text color="white">Avaliação de: {rating.user.name}</Text>
              <Text color="white">"{rating.review}"</Text>
              <Text color="yellow">Nota: {rating.score}</Text>
            </>
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

// export const getServerSideProps = withSSRAuth(async context => {
//   return {
//     props: {},
//   }
// })
