import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import React from 'react';
import './DrawerContainer.module.scss';



/* eslint-disable-next-line */
export interface DrawerContainerProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose();
  btnRef: React.MutableRefObject<undefined>;
  drawerHeader: React.ReactElement;
}

export function DrawerContainer({ children, isOpen, onClose, btnRef, drawerHeader }: DrawerContainerProps) {
  return (
    <Drawer
      size="xl"
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {/* SEARCH FORM */}
            {drawerHeader}
          </DrawerHeader>
          <DrawerBody>
            {children}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default DrawerContainer;
