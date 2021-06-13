import { Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import styles from './Logo.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LogoProps {
  clickHandler?();
}

export const Logo = ({ clickHandler = null }: LogoProps) => {

  return (
    <LinkBox cursor="pointer">
      <NextLink href="/">
        <a href="/" style={{outline: "none"}}>
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
      {clickHandler && <LinkOverlay onClick={clickHandler}></LinkOverlay>}
    </LinkBox>

  )
};

export default Logo;