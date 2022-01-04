import { IconButton, Icon, HStack } from '@chakra-ui/react'
import { RiShutDownLine } from 'react-icons/ri'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { NavLink } from '../NavLink'

export function ButtonsNav() {
  const { signOut } = useContext(AuthContext)

  return (
    <HStack
      spacing={['1', '4']}
      mx={['1', '4']}
      pr={['1', '4']}
      py="1"
      color="gray.300"
      borderrigthwidth={1}
      borderColor='gray.700'
    >
      <IconButton
        aria-label="Sair"
        icon={<Icon as={RiShutDownLine} color="red" />}
        fontSize="18"
        pb="1"
        variant="unstyled"
        onClick={signOut}
      ></IconButton>
    </HStack>
  )
}
