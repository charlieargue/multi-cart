import React from 'react';
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import NextLink from 'next/link';
import './ActionLink.module.scss';

/* eslint-disable-next-line */
export type ActionLinkProps = any & HTMLChakraProps<'a'> & { nextHref: string }

export function ActionLink(props: ActionLinkProps) {
  return (
    <NextLink href={props.nexthref}>
      <chakra.a
        {...props}
        href="props.nexthref"
        px="4"
        py="1.5"
        textAlign="center"
        borderWidth="1px"
        borderColor="whiteAlpha.400"
        fontWeight="medium"
        rounded="base"
        _hover={{ bg: 'whiteAlpha.200' }}
      />
    </NextLink>
  );
}

export default ActionLink;
