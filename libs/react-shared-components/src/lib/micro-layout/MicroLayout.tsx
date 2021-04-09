import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import { Logo } from '@multi-cart/react-ui';
import './MicroLayout.module.scss';

/* eslint-disable-next-line */
export interface MicroLayoutProps {
  heading: string | React.ReactElement;
  subHeading?: string | React.ReactElement;
  children?: React.ReactNode;
}

export function MicroLayout({ heading, subHeading, children }: MicroLayoutProps) {
  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
        <Box mb={{ base: '10', md: '24' }}>
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
    </Box>
  );
}

export default MicroLayout;
