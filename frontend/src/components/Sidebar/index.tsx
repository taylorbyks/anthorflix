import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.700" p="4">
          <DrawerCloseButton mt="6" />
          <DrawerHeader color="white">Menu</DrawerHeader>
          <DrawerBody>
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
