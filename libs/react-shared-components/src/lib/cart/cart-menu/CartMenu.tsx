import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Cart, useCartsQuery } from '@multi-cart/react-data-access';
import { Sort } from '@multi-cart/react-ui';
import React from 'react';
import { CgChevronDown as ChevronDownIcon } from 'react-icons/cg';
import { CartSummary } from '../cart-summary/CartSummary';
import CartMenuRow from './CartMenuRow';
import NewCartButton from '../new-cart-button/NewCartButton';
import CartMenuSkeletons from './CartMenuSkeletons';
import styles from './CartMenu.module.scss';
import NoCarts from './NoCarts';

export interface CartMenuProps {
  currentCartId?: string | null;
}

export const CartMenu = ({ currentCartId = null }: CartMenuProps) => {
  const [{ data, fetching }] = useCartsQuery();
  const currentCart = (data?.carts || []).find(
    (c) => c.id === currentCartId
  ) as Cart;

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
          backgroundColor: mode('gray.400', 'gray.900'),
          color: mode('gray.200', 'gray.100'),
        }}
        cursor={'pointer'}
      >
        {data && !fetching && <CartSummary cart={currentCart} />}
      </MenuButton>

      <MenuList
        data-testid="myCarts"
        minW="440px"
        maxH="85vh"
        className={styles['cart-avatar__scrollable']}
      >
        <Flex justifyContent={'flex-end'} px={3} py={2}>
          {!data?.carts?.length && <NoCarts />}
          <NewCartButton className="ml-3 align-baseline" />
        </Flex>
        <MenuDivider />
        <Sort by="createdAt" childType="c">
          {!data && fetching ? (
            <CartMenuSkeletons />
          ) : (
            data?.carts?.map((c) => (
              <CartMenuRow key={c.id} c={c} currentCartId={currentCartId} />
            ))
          )}
        </Sort>
      </MenuList>
    </Menu>
  );
};

export default CartMenu;
