import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from '../Logo'
import { ButtonsNav } from './ButtonsNav'
import { Profile } from './Profile'
import { Search } from './Search'

interface HeaderProps {
  search?: any
}

export function Header({ search = false }: HeaderProps) {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <IconButton
        aria-label="Open navigation"
        icon={<Icon as={RiMenuLine} />}
        fontSize="24"
        variant="unstyled"
        onClick={onOpen}
        mr="8"
      ></IconButton>
      <Logo />
      {search && <Search setSearch={search} />}
      <Flex ml="auto" justify="center">
        <ButtonsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}
