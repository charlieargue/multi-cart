import { Button, Flex, HStack, Menu, MenuButton, MenuDivider, MenuList, useColorModeValue as mode } from '@chakra-ui/react';
import { Cart, useCartsQuery } from '@multi-cart/react-data-access';
import { useRouter } from 'next/router';
import React from 'react';
import { CgChevronDown as ChevronDownIcon } from 'react-icons/cg';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import { CartAvatarInner } from '../cart-avatar-inner/CartAvatarInner';
import CartAvatarRow from '../cart-avatar-row/CartAvatarRow';
import NewCartButton from '../new-cart-button/NewCartButton';
import styles from './CartAvatar.module.scss'; // NOTE: getting red-squiggly again, but ITS WORKING!?

interface CartAvatarProps {
  currentCartId?: string | null;
}

const noCartsMsg = (<HStack direction="row" mr={4} spacing={1}>
  <WarningIcon />
  <span>You have no carts!</span>
</HStack>);

// -------------------
export const CartAvatar = ({ currentCartId = null }: CartAvatarProps) => {
  const router = useRouter();
  const [{ data, fetching }] = useCartsQuery();

  // TODO: 🔴 NOT LIKE THIS: error (see issues) React has detected a change in the order of Hooks called by CartAvatar.
  const currentCart = (): Cart => {
    if (currentCartId && !fetching && data?.carts) {
      return data?.carts.find((c) => c.id === currentCartId) as Cart;
    }
    return null;
  };

  // TODO: make MenuContainer like DrawerContainer
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
          "color": mode("gray.200", "gray.100"),
        }}
        cursor={'pointer'}>

        {/* User Profile Avatar */}
        {!data && fetching ? null : (
          <CartAvatarInner cart={currentCart()} />
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
            <CartAvatarRow
              key={c.id}
              c={c}
              currentCartId={currentCartId} />
          ))}
      </MenuList>
    </Menu >
  );
}
