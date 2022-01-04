import {
  Button,
  Flex,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Header, Sidebar } from '../../components'
import MoviesList from '../../components/MovieList'
import { Movie } from '../../models'
import api from '../../services/api'
import omdbApi from '../../services/omdbApi'

export default function Users() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [movie, setMovie] = useState('')
  const [search, setSearch] = useState('')
  const [score, setScore] = useState(10)
  const [movieId, setMovieId] = useState('')
  const [comment, setComment] = useState('')

  function openModal(id: string, movie: string) {
    setMovie(movie)
    setMovieId(id)
    onOpen()
  }

  useEffect(() => {
    refetch()
  })

  const handleSendRating = async () => {
    onClose()
    try {
      await api.post('/rating', {
        movie: movieId,
        score,
        comment,
      })

      return toast({
        title: 'Avaliaçao enviada',
        status: 'success',
        isClosable: true,
        position: 'bottom-right',
      })
    } catch (error) {
      return toast({
        title: 'Erro ao enviar avaliação',
        description: error.response.data.error,
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      })
    }
  }

  const { data, isLoading, error, refetch } = useQuery('movies', async () => {
    const response = await omdbApi.search(search)

    const movies = response.Search.map(movie => {
      if (movie.Poster) {
        return {
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          imdbID: movie.imdbID,
          description:
            'Infelizmente a API não fornece a descrição do filme, por isso não podemos mostrar a descrição do filme aqui. Por isso deveria ter escolhido a outra API, porem como o tempo foi curto deixei assim para exemplificar.',
          footer: (
            <Button
              onClick={() => openModal(movie.imdbID, movie.Title)}
              colorScheme="green"
            >
              Avaliar
            </Button>
          ),
        } as Movie
      }
    })

    return movies
  })

  return (
    <Flex direction="column" h="100vh">
      <Header search={setSearch} />
      <Flex w="100%" my="6" maxWidth={1488} mx="auto" px="6">
        <Sidebar />
        <MoviesList movies={data} isLoading={isLoading} error={error} />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Avaliar {movie}</ModalHeader>
          <ModalCloseButton />
          <ModalBody align="center">
            <FormLabel color="gray.100">Nota</FormLabel>
            <Slider
              colorScheme="green"
              onChange={e => setScore(e)}
              defaultValue={10}
              min={0}
              max={10}
              step={0}
              w="95%"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <FormLabel mt="4" color="gray.100">
              Comentário
            </FormLabel>
            <Textarea
              focusBorderColor="green.500"
              color="white"
              bg="gray.800"
              variant="filled"
              _hover={{
                bg: 'gray.900',
              }}
              size="lg"
              onChange={e => setComment(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Stack justify="space-around" w="100%" spacing="6">
              <Button onClick={handleSendRating} colorScheme="green">
                Avaliar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

// export const getServerSideProps = withSSRAuth(async context => {
//   return {
//     props: {},
//   }
// })
