// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################
import { Box, Flex } from '@chakra-ui/react';
import { DarkModeSwitch, Wrapper } from '@multi-cart/react-ui';
import React from 'react';
import { NavBar } from '../nav-bar/NavBar';
export interface AppLayoutProps {
  children?: React.ReactNode;
}

export const AppLayout = (props: AppLayoutProps) => {
  return (
    <>
      <NavBar />
      <Wrapper pt="60px" data-testid="bkgndAppLayout">
        <Flex direction="column" align="center" minH="100vh" {...props}>
          <Box minWidth="100vw" py="2" px={{ sm: '12', lg: '20' }}>
            {props.children}
          </Box>
          <DarkModeSwitch />
        </Flex>
      </Wrapper>
    </>
  );
};
