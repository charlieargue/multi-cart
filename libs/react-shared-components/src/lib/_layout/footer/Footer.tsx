import './Footer.module.scss';
import { Box, ButtonGroup, Flex, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Logo } from '@multi-cart/react-ui';

export const Footer = () => {
  return (
    <Box as="footer" role="contentinfo" py="6" >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        align="center"
      >
        <Box style={{ "marginBottom": "8px" }} ><Logo /></Box>
        <Stack
          my={{ base: '6', md: 0 }}
          direction={{ base: 'column', md: 'row' }}
          marginStart={{ md: '8' }}
          fontSize="sm"
          spacing={{ base: '2', md: '8' }}
          textAlign={{ base: 'center', md: 'start' }}
        >
          <Text><Link isExternal href="http://karlgolka.com" target="_blank">&copy; {new Date().getFullYear()} Karl Golka</Link></Text>
          <Link>Privacy</Link>
          <Link>Terms and Conditions</Link>
        </Stack>
        <ButtonGroup ml={8} color="gray.600" variant="ghost">
          <IconButton as="a" href="www.google.com" aria-label="LinkedIn" icon={<FaLinkedin />} />
          <IconButton as="a" href="www.google.com" aria-label="LinkedIn" icon={<FaGithub />} />
          <IconButton as="a" href="www.google.com" aria-label="LinkedIn" icon={<FaTwitter />} />
        </ButtonGroup>
      </Flex>
    </Box>
  )
};

export default Footer;