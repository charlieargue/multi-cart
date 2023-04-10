import { LinkBox, LinkOverlay, ListIcon, ListItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';
import './SideBarItem.module.scss';

export interface SideBarItemType {
  name: string;
  icon: IconType;
  href?: string;
  onClick?();
}

export interface SideBarItemProps {
  item: SideBarItemType;
  isCurrent?: boolean;
}

export const SideBarItem = ({ item, isCurrent }: SideBarItemProps) => {
  return (
    <LinkBox cursor="pointer">
      <NextLink href={item.href} style={{ outline: 'none' }}>
        <ListItem
          borderRadius="5px"
          cursor="pointer"
          px={3}
          py={2}
          _hover={{ bg: 'gray.100' }}
          bg={isCurrent ? 'pink.100' : null}
        >
          <ListIcon as={item.icon} color="brand.pink" />
          {item.name}
        </ListItem>
      </NextLink>
      {item.onClick && <LinkOverlay onClick={item.onClick}></LinkOverlay>}
    </LinkBox>
  );
};
