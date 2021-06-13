import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import React from 'react';
import './DrawerContainer.module.scss';



/* eslint-disable-next-line */
export interface DrawerContainerProps {
  btnRef?: React.MutableRefObject<undefined>;
  children?: React.ReactNode;
  drawerHeader?: React.ReactElement;
  isOpen: boolean;
  onClose();
  placement?: "bottom" | "top" | "left" | "right"; // hacky? couldn't get it better with any of chakra's types, like I did for TooltipMC, sigh...
  showCloseButton?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
}

// TODO: I bet these props can be better passed/used with the ...props/...last operator???
export function DrawerContainer({
  btnRef = null,
  children,
  drawerHeader = null,
  isOpen,
  onClose,
  placement = "right",
  showCloseButton = true,
  size = "xl" }: DrawerContainerProps) {
  return (
    <Drawer
      finalFocusRef={btnRef}
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size={size}
    >
      <DrawerOverlay>
        <DrawerContent>
          {showCloseButton && <DrawerCloseButton />}
          <DrawerHeader>
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
