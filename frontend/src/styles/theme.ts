import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    green: {
      '500': '#5ED237',
    },
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
  styles: {
    global:{
      body: {
        bg: 'gray.900',
      },
    },
  },
})
