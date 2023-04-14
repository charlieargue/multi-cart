import {
  Box,
  Flex,
  HStack,
  Spinner,
  useColorModeValue as mode,
  useDisclosure
} from '@chakra-ui/react';
import { StateType } from '@multi-cart/react-app-state';
import { useLogoutMutation, useMeQuery } from '@multi-cart/react-data-access';
import { Drawer, Logo } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import useMyToasts from '../../_hooks/useMyToasts';
import { CartMenu } from '../../cart/cart-menu/CartMenu';
import SideBar from '../side-bar/SideBar';
import UserMenu from '../user-menu/UserMenu';
import styles from './NavBar.module.scss';

export const NavBar = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const { toastInfo } = useMyToasts();
  const isFetching = useSelector((state: StateType) => state?.isFetching);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutFunction = async () => {
    localStorage.removeItem('token');
    toastInfo('👋  Bye, come back soon!');
    await logout();
    router.push('/login').finally(() => router.reload());
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
      pr={[3, 0]}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <Box className={styles['nav-bar__scale-down']}>
            <Logo clickHandler={onOpen} skipLink={true} />
          </Box>
          <Spinner
            style={{
              display: isFetching ? 'inline-block' : 'none',
              marginLeft: '-22px',
            }}
            data-testid="fetchingStatus"
            data-value={isFetching ? 'fetching' : ''}
            size="sm"
            color="brand.pink"
            thickness="2px"
            speed="0.65s"
            emptyColor="brand.yellow"
          />
        </HStack>

        <Flex alignItems={'center'}>
          {data?.me && !fetching && (
            <CartMenu currentCartId={data?.me?.currentCartId} />
            )}
            <UserMenu logoutFunction={logoutFunction} username={data?.me?.username} />
        </Flex>
      </Flex>
      <Drawer
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
            className={styles['nav-bar__scale-down']}
          >
            <Logo clickHandler={onClose} />
          </Box>
        }
      >
        <SideBar logoutFunction={logoutFunction} />
      </Drawer>
    </Box>
  );
};
