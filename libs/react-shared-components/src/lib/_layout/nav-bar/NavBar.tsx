import {
    Avatar, Box,
    Button, Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem, MenuList,
    useColorModeValue as mode, useDisclosure
} from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@multi-cart/react-data-access';
import { CartAvatar } from '@multi-cart/react-shared-components';
import { Logo } from "@multi-cart/react-ui";
import { useRouter } from 'next/router';
import React from 'react';
import { CgClose as CloseIcon } from 'react-icons/cg';
import { FiLogOut as LogoutIcon } from 'react-icons/fi';
import { GiHamburgerMenu as HamburgerIcon } from 'react-icons/gi';
import styles from './NavBar.module.scss';

// -------------------
export const NavBar = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [{ data, fetching }] = useMeQuery();
    const [_, logout] = useLogoutMutation();

    return (
        <Box bg={mode('gray.200', 'gray.700')} px={[14, 10, 7, 14]}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

                {/* Hamburger */}
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: !isOpen ? 'none' : 'inherit' }}
                    onClick={isOpen ? onClose : onOpen}
                />

                {/* Logo */}
                <Box
                    className={styles["nav-bar__scale-down"]}
                    display={{ base: 'none', md: 'block' }}>
                    <Logo />
                </Box>

                {/* Cart Avatar & Logout */}
                <Flex alignItems={'center'}>

                    {/* Cart Avatar */}
                    {data?.me && !fetching && (
                        <CartAvatar currentCartId={data?.me?.currentCartId as number} />
                    )}


                    {/* User Profile Avatar w/ DropDown Menu */}
                    <Menu>
                        <MenuButton
                            ml={2}
                            as={Button}
                            rounded={'full'}
                            variant={'solid'}
                            _hover={{
                                "backgroundColor": "white"
                            }}
                            cursor={'pointer'}>
                            
                            {/* User Profile Avatar */}
                            <Flex alignItems={'center'}>
                                <Box mr={2}>{data?.me?.username}</Box>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </Flex>
                        </MenuButton>
                        
                        {/*  Dropdown */}
                        <MenuList>
                            {/* Logout */}
                            <MenuItem
                                icon={<LogoutIcon />}
                                onClick={async () => {
                                    await logout();
                                    router.push("/login").finally(() => router.reload());
                                }}>
                                Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box >
    );
}