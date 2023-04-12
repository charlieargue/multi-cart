import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import MicroLayout from '../../_layout/micro-layout/MicroLayout';
import LoginForm from './LoginForm';

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