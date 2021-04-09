import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
  VisuallyHidden
} from '@chakra-ui/react';
import { RegistrationForm } from '@multi-cart/react-shared-components';
import { DividerWithText, Logo } from '@multi-cart/react-ui';
import React from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import NextLink from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RegisterContainerProps {

}

export const RegisterContainer = () => {
  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
        <Box mb={{ base: '10', md: '24' }}>
          <Logo />
        </Box>
        <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
          <span role='img' aria-label='emoji'>👋 </span> Create Your Account!
      </Heading>
        <Text mt="4" align="center" maxW="md" fontWeight="medium">
          <span>🛡 Your <strong>email is safe</strong> with us</span>
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

          {/* REGISTRATION FORM ------------------- */}
          <RegistrationForm />
          {/* REGISTRATION FORM ------------------- */}

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
        </Box>
      </Box>
    </Box>

  );
}
