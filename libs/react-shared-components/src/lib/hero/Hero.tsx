// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import {
  Box,
  Button,
  Flex,
  Heading, Image,
  Link,

  Stack
} from "@chakra-ui/react";
import { TextMuted } from '@multi-cart/react-ui';
import NextLink from 'next/link';
import React from "react";
import { FiExternalLink as ExternalLink } from 'react-icons/fi';
import './Hero.module.scss';


export interface HeroProps {
  title: string;
  subtitle: string | React.ReactElement;
  image: string;
  ctaText: string;
  ctaLink: string;
}

// -------------------
export const Hero = ({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}: HeroProps) => {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      px={8}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Heading>
        <NextLink href={ctaLink}>
          <Button
            colorScheme="pink"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            {ctaText}
          </Button>
        </NextLink>
        <TextMuted style={{ marginLeft: '16px' }}>
          {/* TODO: make this an ExternalLink cmnpt like this: https://richardhaines.dev/chakra-external-link-with-svg-icon/ */}
          Built by <Link href="http://karlgolka.com" isExternal mr="1">Karl Golka <ExternalLink style={{display: "inline"}} /></Link>in 2021
          </TextMuted>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image src={image} size="100%" rounded="1rem" shadow="2xl" fallbackSrc="/blue-loading-spinner-transparent-bg.gif" />
      </Box>
    </Flex>
  );
}




export default Hero;