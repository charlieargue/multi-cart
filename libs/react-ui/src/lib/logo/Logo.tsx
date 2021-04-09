import { Text, Box, Flex, useToken } from '@chakra-ui/react';
import * as React from 'react';
import styles from './Logo.module.scss';
import NextLink from 'next/link';

export function Logo(props) {
  return (
    <NextLink href="/">
      <a href="/">
        <Flex justifyContent="center">
          <Box className={styles["logo__scale-up"]}>🛍</Box>
          <Box>
            <Text
              color="brand.pink"
              fontSize="3xl"
              bgGradient="linear(to-l, brand.yellow, brand.pink)"
              bgClip="text"
              fontWeight="extrabold">
              <i>multi</i>&nbsp;<strong>cart</strong>
            </Text>
          </Box>
        </Flex>
      </a>
    </NextLink>
  )
}

export default Logo;