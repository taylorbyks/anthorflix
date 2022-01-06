import { Icon, HStack } from '@chakra-ui/react'
import { RiStarFill } from 'react-icons/ri'

interface StarsProps {
  score: number
}

export function Stars({ score }: StarsProps) {
  return (
    <HStack spacing="2">
      {[...Array(score)].map((_, index) => (
        <Icon key={index} as={RiStarFill} color="yellow" />
      ))}
    </HStack>
  )
}
