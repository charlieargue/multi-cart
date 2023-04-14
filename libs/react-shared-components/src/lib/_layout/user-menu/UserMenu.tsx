import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue as mode
} from '@chakra-ui/react';
import React from 'react';
import { FiLogOut as LogoutIcon } from 'react-icons/fi';

export interface UserMenuProps {
  username: string;
  logoutFunction(): void;
}

export const UserMenu = ({username, logoutFunction}: UserMenuProps) => {
  
  return (
    <Menu>
    <MenuButton
      ml={2}
      data-testid="btnUserProfile"
      as={Button}
      rounded={'full'}
      variant={'solid'}
      _hover={{
        backgroundColor: mode('gray.400', 'gray.900'),
      }}
      cursor={'pointer'}
    >
      <Flex alignItems={'center'}>
        <Box mr={2}>{username}</Box>
        <Avatar
          size={'sm'}
          src={
            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          }
        />
      </Flex>
    </MenuButton>
    <MenuList>
      <MenuItem icon={<LogoutIcon />} onClick={logoutFunction}>
        Logout
      </MenuItem>
    </MenuList>
  </Menu>
  );
}

export default UserMenu;
