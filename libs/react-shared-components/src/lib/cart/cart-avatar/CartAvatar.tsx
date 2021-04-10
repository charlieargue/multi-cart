import { Badge, Box, Button, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorModeValue as mode, Text } from '@chakra-ui/react';
import { Cart, useCartsQuery } from '@multi-cart/react-data-access';
import { CartAvatarInner, NewCartButton } from '@multi-cart/react-shared-components';
import { useRouter } from 'next/router';
import React from 'react';
import { CgChevronDown as ChevronDownIcon } from 'react-icons/cg';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import NextLink from 'next/link';
import { toDaysAgo } from '@multi-cart/util';
import clsx from 'clsx';
import styles from './CartAvatar.module.scss';

interface CartAvatarProps {
  currentCartId?: number;
}

const noCartsMsg = (<HStack direction="row" mr={4} spacing={1}>
  <WarningIcon />
  <span>You have no carts!</span>
</HStack>);

// -------------------
export const CartAvatar = ({ currentCartId = -1 }: CartAvatarProps) => {
  const router = useRouter();
  const [{ data, fetching }] = useCartsQuery();

  // TODO: 🔴 NOT LIKE THIS: error (see issues) React has detected a change in the order of Hooks called by CartAvatar.
  let currentCart: Cart = {} as Cart;
  if ((currentCartId !== -1) && !fetching && data?.carts) {
    currentCart = data?.carts.find((c) => c.id === currentCartId) as Cart;
  }


  return (
    <Menu isLazy>
      <MenuButton
        rightIcon={<ChevronDownIcon />}
        ml={2}
        as={Button}
        rounded={'full'}
        variant={'solid'}
        colorScheme="green"
        _hover={{
          "backgroundColor": mode("gray.400", "gray.900"),
          "color": mode("gray.400", "gray.100"),
        }}
        cursor={'pointer'}>

        {/* User Profile Avatar */}
        {!data && fetching ? null : (
          <CartAvatarInner cart={currentCart} />
        )}

      </MenuButton>

      {/*  Dropdown */}
      <MenuList minW="440px" maxH="85vh" className={styles['cart-avatar__scrollable']}>

        {/* dropdown HEADER */}
        <Flex justifyContent={'flex-end'} px={3} py={2}>
          {!data?.carts?.length && noCartsMsg}


          <NewCartButton className="ml-3 align-baseline" />
        </Flex>
        <MenuDivider />

        {/* if FETCHING and don't have DATA... */}
        {
          !data && fetching ? (<div>loading...</div>) : data?.carts?.map((c) => !c ? null : (
            <MenuItem
              key={c.id}
              bgColor={c.id === currentCartId ? mode("green.50", "gray.900") : null}>

              <NextLink
                href="/cart/[id]"
                as={`/cart/${c.id}`}>

                {/* dropdown CART GUTS */}
                <Flex
                  minW="100%"
                  justify="space-between"
                >
                  <Box>
                    <strong>{c.name}</strong>
                    <br />
                    <Text color="gray.500" fontSize="xs" ml={.5}>{toDaysAgo(c.createdAt)}</Text>
                  </Box>
                  <Box>
                    <CartAvatarInner cart={!c ? {} as any : c} />
                  </Box>
                </Flex>
                {/* dropdown CART GUTS */}

              </NextLink>
              <MenuDivider />
            </MenuItem>
          ))}
      </MenuList>
    </Menu >
  );
}
