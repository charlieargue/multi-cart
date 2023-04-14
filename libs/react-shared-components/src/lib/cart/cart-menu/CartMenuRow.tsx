import React from 'react';
import {
  Box,
  Flex,
  MenuDivider,
  MenuItem,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { toDaysAgo } from '@multi-cart/util';
import NextLink from 'next/link';
import { Cart } from '@multi-cart/react-data-access';
import { CartSummary } from '../cart-summary/CartSummary';

export interface CartMenuRowProps {
  c: Cart;
  currentCartId?: string | null;
}

export const CartMenuRow = ({ c, currentCartId }: CartMenuRowProps) => {
  return (
    <NextLink key={c.id} href="/cart/[id]" as={`/cart/${c.id}`}>
      <MenuItem
        bgColor={c.id === currentCartId ? mode('green.50', 'gray.900') : null}
      >
        <Flex minW="100%" justify="space-between">
          <Box>
            <strong>{c.name}</strong>
            <br />
            <Text color="gray.500" fontSize="xs" ml={0.5}>
              {toDaysAgo(c.createdAt)}
            </Text>
          </Box>
          <Box>
            <CartSummary cart={c} />
          </Box>
        </Flex>
        <MenuDivider />
      </MenuItem>
    </NextLink>
  );
};

export default CartMenuRow;
