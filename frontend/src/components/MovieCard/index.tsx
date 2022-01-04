import { Flex, Image, Heading, Text } from '@chakra-ui/react'
import { Movie } from '../../models'

export function MovieCard({
  title,
  year,
  poster,
  imdbID,
  description,
  footer,
}: Movie) {
  return (
    <Flex mb="4" bg="gray.800" p="8" borderRadius={8} flex="1">
      <Image alt="poster" src={poster} />
      <Flex ml="12" direction="column" justify="space-between">
        <Flex ml="12" direction="column">
          <Heading size="lg" fontWeight="normal" color="white">
            {title}
          </Heading>
          <Text>{year}</Text>
          <Text mt="12" color="gray.300">
            {description}
          </Text>
        </Flex>
        <Flex justify="flex-end">{footer}</Flex>
      </Flex>
    </Flex>
  )
}
