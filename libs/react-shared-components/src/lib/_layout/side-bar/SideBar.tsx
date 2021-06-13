import {
  Divider,
  List
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BiHelpCircle as HelpIcon } from 'react-icons/bi';
import {
  FaRegListAlt as ProductsIcon,
  FaSearch as SearchIcon,
  FaUser as UserIcon
} from 'react-icons/fa';
import { FiLogOut as LogoutIcon } from 'react-icons/fi';
import { GoDashboard as DashboardIcon } from 'react-icons/go';
import { useMyToasts } from '../../..';
import { SideBarItem, SideBarItemType } from '../side-bar-item/SideBarItem';
import './SideBar.module.scss';


/* eslint-disable-next-line */
export interface SideBarProps {
  logoutFunction?();
}

// -------------------
export function SideBar({ logoutFunction }: SideBarProps) {
  const { toastWarning } = useMyToasts();
  const soonFn = () => toastWarning("🤘 Coming soon!");
  const routeName = useRouter().route.replace("/", "");

  // TODO: link over (aka with onClick) breaks the gray _hover, WIP
  const mainLinks: SideBarItemType[] = [
    { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
    { name: "Products", icon: ProductsIcon, href: "/products" },
    { name: "Search", icon: SearchIcon, href: "/search", onClick: soonFn },
    { name: "User Profile", icon: UserIcon, href: "/profile", onClick: soonFn },
  ];
  const secondaryLinks: SideBarItemType[] = [
    { name: "Logout", icon: LogoutIcon, href: "", onClick: logoutFunction },
    { name: "Help Center", icon: HelpIcon, href: "", onClick: soonFn },
  ];

  return (
    <>
      <Divider mt={2} mb={3} />
      <List spacing={2} ml={3}>
        {mainLinks.map((m) => (
          <SideBarItem item={m} key={m.name} isCurrent={routeName === m.name.toLowerCase()} />
        ))}
      </List>
      <Divider mt={2} mb={3} />
      <List spacing={2} ml={3}>
        {secondaryLinks.map((s) => (
          <SideBarItem item={s} key={s.name} isCurrent={routeName === s.name.toLowerCase()}/>
        ))}
      </List>
    </>
  );
}

export default SideBar;
