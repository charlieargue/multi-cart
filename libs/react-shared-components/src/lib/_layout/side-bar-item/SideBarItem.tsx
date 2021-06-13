import {
  LinkBox,
  LinkOverlay,
  ListIcon,
  ListItem
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';
import './SideBarItem.module.scss';

/* eslint-disable-next-line */
export interface SideBarItemType {
  name: string;
  icon: IconType;
  href?: string;
  onClick?();
}

/* eslint-disable-next-line */
export interface SideBarItemProps {
  item: SideBarItemType;
}

export const SideBarItem = ({ item }: SideBarItemProps) => {
  return (
    <LinkBox cursor="pointer">
      <NextLink
        href={item.href}>
        <a
          href={item.href}
          style={{ outline: "none" }}>
          <ListItem
            borderRadius="5px"
            cursor="pointer"
            px={3}
            py={2}
            _hover={{ bg: "gray.100" }}>
            <ListIcon as={item.icon} color="brand.pink" />{item.name}
          </ListItem>
        </a>
      </NextLink>
      {item.onClick && <LinkOverlay onClick={item.onClick}></LinkOverlay>}
    </LinkBox>
  );
}
