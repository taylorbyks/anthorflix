import { Flex, Input, Icon } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function Search({ setSearch }) {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="14"
      maxWidth={500}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar filme"
        _placeholder={{ color: 'gray.400' }}
        onChange={e => setSearch(e.target.value)}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}
