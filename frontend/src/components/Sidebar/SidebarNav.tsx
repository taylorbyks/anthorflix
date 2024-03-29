import { Stack } from '@chakra-ui/react'
import {
  RiDashboardLine,
  RiFileTextLine,
  RiCalendarCheckFill,
} from 'react-icons/ri'
import { NavLink } from '../NavLink'
import { NavSection } from './NavSection'

export function SidebarNav() {
  return (
    <Stack spacing="8" align="flex-start">

      <NavSection title="FILMES">
        <NavLink icon={RiFileTextLine} href="/ratings">
          Nova avaliação
        </NavLink>
        <NavLink icon={RiCalendarCheckFill} href="/home">
          Avaliações
        </NavLink>
      </NavSection>
      <NavSection title="PESSOAL">
        <NavLink icon={RiDashboardLine} href="/my">
          Minhas avaliações
        </NavLink>
      </NavSection>
    </Stack>
  )
}
