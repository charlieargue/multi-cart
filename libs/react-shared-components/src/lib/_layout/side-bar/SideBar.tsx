import {
  Divider,
  List,
  ListIcon,
  ListItem
} from '@chakra-ui/react';
import './SideBar.module.scss';
import React from 'react'
import {
  FaRegListAlt as ProductsIcon,
  FaSearch as SearchIcon,
  FaUser as UserIcon
} from 'react-icons/fa';
import { GoDashboard as DashboardIcon } from 'react-icons/go';
import { FiLogOut as LogoutIcon } from 'react-icons/fi';
import { BiHelpCircle as HelpIcon } from 'react-icons/bi';

/* eslint-disable-next-line */
export interface SideBarProps { }

const mainLinks = [
  { name: "Dashboard", icon: DashboardIcon },
  { name: "Products", icon: ProductsIcon },
  { name: "Search", icon: SearchIcon },
  { name: "User Profile", icon: UserIcon },
];
const secondaryLinks = [
  { name: "Logout", icon: LogoutIcon },
  { name: "Help Center", icon: HelpIcon },
];

export function SideBar(props: SideBarProps) {

  return (
    <>
      <Divider mt={2} mb={3} />
      <List spacing={2} ml={3}>
        {mainLinks.map((m) => (
          <ListItem
            key={m.name}
            borderRadius="5px"
            cursor="pointer"
            px={3}
            py={2}
            _hover={{ bg: "gray.100" }}>
            <ListIcon as={m.icon} color="brand.pink" />{m.name}
          </ListItem>
        ))}
      </List>
      <Divider mt={2} mb={3} />
      <List spacing={2} ml={3}>
        {secondaryLinks.map((s) => (
          <ListItem
            key={s.name}
            borderRadius="5px"
            cursor="pointer"
            px={3}
            py={2}
            _hover={{ bg: "gray.100" }}>
            <ListIcon as={s.icon} color="brand.pink" />{s.name}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default SideBar;
