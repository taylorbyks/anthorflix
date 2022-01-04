import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

export function Chakra({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
