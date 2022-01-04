import { Link, Text, Icon, LinkProps } from '@chakra-ui/react'
import { ElementType } from 'toasted-notes/node_modules/@types/react'
import { ActiveLink } from './Sidebar/ActiveLink'

interface NavLinkProps extends LinkProps {
  icon: ElementType
  children: string
  href: string
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <Link display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" mt='3'/>
        <Text ml="4" color="white" fontWeight="medium" mt='3'>
          {children}
        </Text>
      </Link>
    </ActiveLink>
  )
}
