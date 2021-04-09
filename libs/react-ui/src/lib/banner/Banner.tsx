import React from 'react';
import { FaBell } from 'react-icons/fa';
import { Box, Stack, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import './Banner.module.scss';

/* eslint-disable-next-line */
export interface BannerProps {
  text: string | React.ReactElement;
  actionLink: React.ReactElement;
}

export function Banner({ text, actionLink }: BannerProps) {
  return (
    <Box as="section">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        py="3"
        px={{ base: '3', md: '6', lg: '8' }}
        color="white"
        bg={useColorModeValue('blue.600', 'blue.400')}
        justifyContent="center"
        alignItems="center"
      >
        <HStack direction="row" spacing="3">
          <Box as={FaBell} fontSize="2xl" h="10" />
          <Text fontWeight="medium" marginEnd="2">
            {text}
          </Text>
        </HStack>
        {actionLink}
      </Stack>
    </Box>
  );
}

export default Banner;
