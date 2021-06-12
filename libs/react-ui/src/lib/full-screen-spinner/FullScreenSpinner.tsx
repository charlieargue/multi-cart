import { Box, Button, Center, Fade, Progress, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Logo from '../logo/Logo';
import { Wrapper } from '../wrapper/Wrapper';
import './FullScreenSpinner.module.scss';

/* eslint-disable-next-line */
export interface FullScreenSpinnerProps { }

export function FullScreenSpinner(props: FullScreenSpinnerProps) {
  return (
    <Fade in={true}>
      <Wrapper>
        <Center
          bgGradient="linear(to-l, brand.pink, brand.yellow)"
          minW="100vw"
          minH="100vh">
          <Button
            boxShadow={'lg'}
            px="8"
            py="9">
            <Logo />
            <VStack
              alignItems="self-start"
              spacing="-2">
              <Text
                ml={5}
                mb={2}
                color="gray.500"
                fontSize="md"
                fontWeight="normal">
                Loading, please wait...
              </Text>
              <Box
                minW="16vw"
                pl={5}>
                <Progress
                  borderRadius="4px"
                  size="md"
                  colorScheme="pink"
                  hasStripe={true}
                  isAnimated={true}
                  value={100} />
              </Box>
            </VStack>
          </Button>
        </Center>
      </Wrapper>
    </Fade>
  );
}

export default FullScreenSpinner;
