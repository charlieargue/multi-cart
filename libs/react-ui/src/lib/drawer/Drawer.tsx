import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  ResponsiveValue,
} from '@chakra-ui/react';
import React from 'react';

export interface DrawerProps {
  btnRef?: React.MutableRefObject<undefined>;
  children?: React.ReactNode;
  drawerHeader?: React.ReactElement;
  isOpen: boolean;
  onClose();
  placement?: 'bottom' | 'top' | 'left' | 'right';
  showCloseButton?: boolean;
  size?: ResponsiveValue<'sm' | 'md' | 'lg' | 'xl' | 'full' | 'xs'>;
}

export function Drawer({
  btnRef = null,
  children,
  drawerHeader = null,
  isOpen,
  onClose,
  placement = 'right',
  showCloseButton = true,
  size = 'xl',
}: DrawerProps) {
  return (
    <ChakraDrawer
      finalFocusRef={btnRef}
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size={size}
    >
      <DrawerOverlay>
        <DrawerContent>
          {showCloseButton && <DrawerCloseButton />}
          <DrawerHeader>{drawerHeader}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawer>
  );
}

export default Drawer;
