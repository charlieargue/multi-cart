import {
    Avatar, Box,
    Button, Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem, MenuList, Spinner,
    useColorModeValue as mode, useDisclosure, useToast
} from '@chakra-ui/react';
import { StateType } from '@multi-cart/react-app-state';
import { useLogoutMutation, useMeQuery } from '@multi-cart/react-data-access';
import { DrawerContainer, Logo } from "@multi-cart/react-ui";
import { useRouter } from 'next/router';
import React from 'react';
import { FiLogOut as LogoutIcon } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { CartAvatar } from '../../cart/cart-avatar/CartAvatar';
import useMyToasts from '../../_hooks/useMyToasts';
import SideBar from '../side-bar/SideBar';
import styles from './NavBar.module.scss'; // TODO: the red squiggly goes away if you don't use the styles, and just straight import the scss...

// TODO: this was built early, and not componentized very well by me, do that please!
// -------------------
export const NavBar = () => {
    const router = useRouter();
    const [{ data, fetching }] = useMeQuery();
    const [_, logout] = useLogoutMutation();
    const { toastInfo } = useMyToasts();
    const isFetching = useSelector((state: StateType) => state.isFetching);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutFunction = async () => {
        // clear token(s)
        localStorage.removeItem("token");
        toastInfo("👋  Bye, come back soon!");
        await logout();

        // TODO: how about purge all cache so don't have to reload?
        router.push("/login").finally(() => router.reload());
    };

    return (
        <Box
            position="fixed"
            minW="100vw"
            zIndex="100"
            shadow="sm"
            bgGradient="linear(to-b, gray.200, gray.300)"
            color={mode('gray.700', 'gray.200')}
            px={[0, 10, 7, 14]}
            pr={[3, 0]}>
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}>


                <HStack>
                    {/* Logo */}
                    <Box
                        className={styles["nav-bar__scale-down"]}>
                        <Logo clickHandler={onOpen} />
                    </Box>
                    <Spinner
                        style={{
                            display: isFetching ? "inline-block" : "none",
                            marginLeft: "-22px",
                            marginTop: "-1px"
                        }}
                        size="sm"
                        color="brand.pink"
                        thickness="2px"
                        speed="0.65s"
                        emptyColor="brand.yellow" />
                </HStack>

                {/* Cart Avatar & Logout */}
                <Flex alignItems={'center'}>

                    {/* Cart Avatar */}
                    {data?.me && !fetching && (
                        <CartAvatar currentCartId={data?.me?.currentCartId} />
                    )}

                    {/* User Profile Avatar w/ DropDown Menu */}
                    <Menu>
                        <MenuButton
                            ml={2}
                            as={Button}
                            rounded={'full'}
                            variant={'solid'}
                            _hover={{
                                "backgroundColor": mode("gray.400", "gray.900")
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
                                onClick={logoutFunction}>
                                Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {/* DRAWER */}
            <DrawerContainer
                placement="left"
                size="xs"
                isOpen={isOpen}
                onClose={onClose}
                showCloseButton={false}
                drawerHeader={
                    <Box
                        ml="-20"
                        mb="-5"
                        textAlign="left"
                        className={styles["nav-bar__scale-down"]}>
                        <Logo clickHandler={onClose} />
                    </Box>
                }>
                <SideBar logoutFunction={logoutFunction} />
            </DrawerContainer>

        </Box>
    );
}