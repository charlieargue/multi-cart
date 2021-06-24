import { Box, Flex } from '@chakra-ui/react';
import { Wrapper } from "@multi-cart/react-ui";
import React from 'react';
import DarkModeSwitch from '../../dark-mode-switch/DarkModeSwitch';
import { NavBar } from '../nav-bar/NavBar';
import './AppLayout.module.scss';

export interface AppLayoutProps {
  children?: React.ReactNode
}

/**
 * Layout for Application pages that require authentication (eg. Dashboard, EditCart, etc.)
 *
 */
export const AppLayout = (props: AppLayoutProps) => {
  return (
    <>
      <NavBar />
      <Wrapper pt="60px" data-testid="bkgndAppLayout">
        <Flex
          direction="column"
          align="center"
          minH="100vh"
          {...props}
        >
          <Box minWidth="100vw" py="2" px={{ sm: '12', lg: '20' }}>
            {props.children}
          </Box>
          <DarkModeSwitch />
        </Flex>
      </Wrapper>
    </>
  );
}