import React from 'react';
import MicroLayout from '../../_layout/micro-layout/MicroLayout';
import NextLink from 'next/link';
import LoginForm from './LoginForm';
import { Box, Button, SimpleGrid, useColorModeValue as mode, VisuallyHidden } from '@chakra-ui/react';
import { DividerWithText } from '@multi-cart/react-ui';
import { FaFacebook } from 'react-icons/fa';

export default {
  component: LoginForm,
  title: 'LoginForm',
};

export const primary = () => {

  return <MicroLayout
    heading="Welcome back!"
    subHeading={<>
      <span>Don&apos;t have an account?</span>
      <NextLink href="/register" legacyBehavior>
        <Box
          as="a"
          marginStart="1"
          href="/register"
          color={mode('pink.600', 'pink.200')}
          _hover={{ color: 'pink.600' }}
          display={{ base: 'block', sm: 'revert' }}
        >
          Register an account.
          </Box>
      </NextLink>
    </>}>
    <LoginForm />
  </MicroLayout>;
};