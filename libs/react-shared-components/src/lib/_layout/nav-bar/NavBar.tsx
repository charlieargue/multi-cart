import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue as mode,
    Stack,
} from '@chakra-ui/react';
import { Logo } from "@multi-cart/react-ui";
import { useLogoutMutation, useMeQuery } from '@multi-cart/react-data-access';
import { CartAvatar } from '@multi-cart/react-shared-components';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styles from './NavBar.module.scss';
import { CgClose as CloseIcon } from 'react-icons/cg';
import { GiHamburgerMenu as HamburgerIcon } from 'react-icons/gi';
import { IoMdAdd as AddIcon } from 'react-icons/io';

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



                    {/* Cart Avatar 
                    <div className="d-flex align align-items-sm-baseline">
                        <div className="mr-2 text-white">{data?.me?.username}</div>
                        <CartAvatar currentCartId={data?.me?.currentCartId as number} />
                        <Button variant="link" onClick={async () => {
                            await logout();
                            router.push("/login").finally(() => router.reload());
                        }}>logout</Button>
                    </div>
                    */}


                    {/* User Profile Avatar w/ DropDown Menu */}
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}>
                            <Avatar
                                size={'sm'}
                                src={
                                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                }
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Link 1</MenuItem>
                            <MenuItem>Link 2</MenuItem>
                            <MenuDivider />
                            <MenuItem>Link 3</MenuItem>
                        </MenuList>
                    </Menu>

                    {/* Logout */}
                    <Button
                        variant={'solid'}
                        colorScheme="pink"
                        size={'sm'}
                        ml={4}
                        leftIcon={<AddIcon />}>
                        Logout
                    </Button>


                </Flex>
            </Flex>

            {/* {isOpen ? (
                <Box pb={4}>
                    <Stack as={'nav'} spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null} */}
        </Box>
    );
}