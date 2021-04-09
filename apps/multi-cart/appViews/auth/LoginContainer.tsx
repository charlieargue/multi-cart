import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
  VisuallyHidden
} from '@chakra-ui/react';
import { LoginForm } from '@multi-cart/react-shared-components';
import { DividerWithText, Logo } from '@multi-cart/react-ui';
import React from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import NextLink from 'next/link';
import { MicroLayout } from '@multi-cart/react-shared-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginContainerProps {

}

export const LoginContainer = () => {
  return (
    <MicroLayout
      heading="Welcome back!"
      subHeading={<>
        <span>Don&apos;t have an account?</span>
        <NextLink href="/register">
          <Box
            as="a"
            marginStart="1"
            href="#"
            color={mode('pink.600', 'pink.200')}
            _hover={{ color: 'pink.600' }}
            display={{ base: 'block', sm: 'revert' }}
          >
            Register an account.
              </Box>
        </NextLink>
      </>}>
      <LoginForm />

      <DividerWithText mt="6">coming soon...</DividerWithText>
      <SimpleGrid mt="6" columns={3} spacing="3">
        <Button disabled color="currentColor" variant="outline">
          <VisuallyHidden>Login with Facebook</VisuallyHidden>
          <FaFacebook />
        </Button>
        <Button disabled color="currentColor" variant="outline">
          <VisuallyHidden>Login with Google</VisuallyHidden>
          <FaGoogle />
        </Button>
        <Button disabled color="currentColor" variant="outline">
          <VisuallyHidden>Login with Github</VisuallyHidden>
          <FaGithub />
        </Button>
      </SimpleGrid>
    </MicroLayout>
  );
}