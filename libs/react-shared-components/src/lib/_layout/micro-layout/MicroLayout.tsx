// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { DarkModeSwitch, Logo } from '@multi-cart/react-ui';
import { Wrapper } from '@multi-cart/react-ui';

export interface MicroLayoutProps {
  heading: string | React.ReactElement;
  subHeading?: string | React.ReactElement;
  children?: React.ReactNode;
}

export const MicroLayout = ({
  heading,
  subHeading,
  children,
}: MicroLayoutProps) => {
  return (
    <Wrapper data-testid="bkgndAppLayout">
      <Box
        bg={mode('gray.50', 'inherit')}
        minH="100vh"
        minWidth="100vw"
        py="20"
        px={{ sm: '6', lg: '8' }}
      >
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
          <Box mb={{ base: '8', md: '16' }}>
            <Logo />
          </Box>
          <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
            {heading}
          </Heading>
          <Text mt="4" align="center" maxW="md" fontWeight="medium">
            {subHeading}
          </Text>
        </Box>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
          <Box
            bg={mode('white', 'gray.700')}
            py="8"
            px={{ base: '4', md: '10' }}
            shadow="base"
            rounded={{ sm: 'lg' }}
          >
            {children}
          </Box>
        </Box>
        <DarkModeSwitch />
      </Box>
    </Wrapper>
  );
};

export default MicroLayout;
