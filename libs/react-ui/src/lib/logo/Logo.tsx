import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import styles from './Logo.module.scss';
import { StateType } from '@multi-cart/react-data-access';
import { useSelector } from 'react-redux';

export function Logo(props) {
  const isFetching = useSelector((state: StateType) => state.isFetching);

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
          <Spinner
            style={{ marginTop: "11px", display: isFetching ? "inline-block" : "none" }}
            ml={3}
            size="md"
            color="brand.pink"
            thickness="2px"
            speed="0.65s"
            emptyColor="brand.yellow" />
        </Flex>
      </a>
    </NextLink>
  )
}

export default Logo;