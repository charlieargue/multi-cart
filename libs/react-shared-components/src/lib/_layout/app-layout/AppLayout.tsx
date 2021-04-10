import { Box, Flex, useColorModeValue as mode } from '@chakra-ui/react';
import { DarkModeSwitch, Footer, NavBar } from '@multi-cart/react-shared-components';
import { Wrapper } from "@multi-cart/react-ui";
import React from 'react';
import './AppLayout.module.scss';

interface AppLayoutProps {
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
      <Wrapper>
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