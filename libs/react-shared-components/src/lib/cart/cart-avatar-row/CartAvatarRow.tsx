import React from 'react';
import { Box, Flex, MenuDivider, MenuItem, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { toDaysAgo } from '@multi-cart/util';
import NextLink from 'next/link';
import { Cart } from '@multi-cart/react-data-access';
import './CartAvatarRow.module.scss';
import { CartAvatarInner } from '../cart-avatar-inner/CartAvatarInner';

export interface CartAvatarRowProps {
  c: Cart,
  currentCartId?: string | null;
}

export function CartAvatarRow({ c, currentCartId }: CartAvatarRowProps) {
  return (
    <NextLink
      key={c.id}
      href="/cart/[id]"
      as={`/cart/${c.id}`} legacyBehavior>
      <a href={`/cart/${c.id}`}>
        <MenuItem
          bgColor={c.id === currentCartId ? mode("green.50", "gray.900") : null}>


          {/* dropdown CART GUTS */}
          <Flex
            minW="100%"
            justify="space-between"
          >
            {/* DEBUGGING */}
            <Box>
              <strong>{c.name}</strong>
              <br />
              <Text color="gray.500" fontSize="xs" ml={.5}>{toDaysAgo(c.createdAt)}</Text>
            </Box>
            <Box>
              <CartAvatarInner cart={!c ? {} as Cart : c} />
            </Box>
          </Flex>
          {/* dropdown CART GUTS */}
          <MenuDivider />
        </MenuItem>
      </a>
    </NextLink>
  );
}

export default CartAvatarRow;
