import { Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import styles from './Logo.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LogoProps {
  clickHandler?();
  skipLink?: boolean;
}

export const Logo = ({ clickHandler = null, skipLink = false }: LogoProps) => {
  const logoClickFixer = clickHandler
    ? {
        onClick: (e: SyntheticEvent) => {
          clickHandler();
          e.stopPropagation();
          e.preventDefault();
        },
      }
    : {};

  const logo = (
    <Flex justifyContent="center" {...logoClickFixer}>
      <Box className={styles['logo__scale-up']}>🛍</Box>
      <Box>
        <Text
          color="brand.pink"
          fontSize="3xl"
          bgGradient="linear(to-l, brand.yellow, brand.pink)"
          bgClip="text"
          fontWeight="extrabold"
        >
          <i>multi</i>&nbsp;<strong>cart</strong>
        </Text>
      </Box>
    </Flex>
  );

  if (skipLink) {
    return <LinkBox cursor="pointer">{logo}</LinkBox>;
  } else {
    return (
      <LinkBox cursor="pointer">
        <NextLink href="/" style={{ outline: 'none' }}>
          {logo}
        </NextLink>
        {clickHandler && <LinkOverlay onClick={clickHandler}></LinkOverlay>}
      </LinkBox>
    );
  }
};

export default Logo;
