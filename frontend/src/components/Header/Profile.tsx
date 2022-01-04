import { Flex, Text, Box, Avatar } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

interface ProfileProps {
  showProfileData?: boolean
  src?: string
}

export function Profile({ showProfileData, src }: ProfileProps) {
  const { user } = useContext(AuthContext)

  return (
    <Flex align="center">
      {showProfileData && (
        <Box m="4" textalign="rigth">
          <Text>{user.name}</Text>
          <Text color='gray.300'>
            {user.email}
          </Text>
        </Box>
      )}
      <Avatar size="md" name={user.name} src={src} />
    </Flex>
  )
}
