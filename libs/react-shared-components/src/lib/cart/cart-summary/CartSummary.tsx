import { HStack, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { Cart } from '@multi-cart/react-data-access';
import { sumTotalCost, sumTotalItems, toFriendlyCurrency } from '@multi-cart/util';
import React from 'react';
import { FaDollarSign as DollarIcon, FaShoppingCart as ShoppingCartIcon } from 'react-icons/fa';

export interface CartSummaryProps {
  cart?: Cart
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
  return (
    <HStack spacing={4} cursor={'pointer'}>
      <Tag size="lg" variant="transparent">
        <TagLabel>
          <span data-testid="currentCartTotalItems">{sumTotalItems(cart)}</span>
        </TagLabel>
        <TagLeftIcon mr={2} ml={2} boxSize="16px" as={ShoppingCartIcon} />
        <TagLeftIcon mr={0} boxSize="14px" as={DollarIcon} />
        <TagLabel>
          <strong data-testid="currentCartTotalCost">{toFriendlyCurrency(sumTotalCost(cart), true)}</strong>
        </TagLabel>
      </Tag>
    </HStack>
  );
}