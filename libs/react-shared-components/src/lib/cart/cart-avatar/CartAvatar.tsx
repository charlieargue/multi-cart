import { Box, Button, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, SkeletonCircle, SkeletonText, useColorModeValue as mode } from '@chakra-ui/react';
import { Cart, useCartsQuery } from '@multi-cart/react-data-access';
import { Sort } from '@multi-cart/react-ui';
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

// TODO: clear up this object VS JSX confusing approach I've got going here (including the && AND syntax VS ternary syntax ... or all good?)
const CartSkeleton = ((idx: string) => {
  return (<MenuItem
    key={idx}>
    <Flex
      minW="100%"
      justify="space-between">
      <HStack width="100%" spacing="4">
        <Box width="80%"><SkeletonText noOfLines={2} /></Box>
        <Box><SkeletonCircle size="10" /></Box>
      </HStack>
    </Flex>
    <MenuDivider />
  </MenuItem>);
});
const cartSkeletons = [1, 2, 3, 4].map((idx) => CartSkeleton(idx.toString()));


// -------------------
export const CartAvatar = ({ currentCartId = null }: CartAvatarProps) => {
  const router = useRouter();
  const [{ data, fetching }] = useCartsQuery();

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
        data-testid="btnMyCarts"
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

        {/* USERS CART LIST */}
        <Sort by="createdAt" childType="c">
          {
            !data && fetching ? cartSkeletons : data?.carts?.map((c) => !c ? null : (
              <CartAvatarRow
                key={c.id}
                c={c}
                currentCartId={currentCartId} />
            ))}
        </Sort>
      </MenuList>
    </Menu >
  );
}
