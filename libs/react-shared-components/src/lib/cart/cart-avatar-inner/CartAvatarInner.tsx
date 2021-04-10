import { HStack, Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/react';
import { Cart } from '@multi-cart/react-data-access';
import React from 'react';
import { CgClose as CloseIcon } from 'react-icons/cg';
import { FaShoppingCart as ShoppingCartIcon, FaDollarSign as DollarIcon } from 'react-icons/fa';
import { sumTotalCost, sumTotalItems, toFriendlyCurrency } from '@multi-cart/util';
import './CartAvatarInner.module.scss';

interface CartAvatarInnerProps {
  cart?: Cart
}

export const CartAvatarInner = ({ cart }: CartAvatarInnerProps) => {

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