import { HStack, Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/react';
import { Cart } from '@multi-cart/react-data-access';
import React from 'react';
import { CgClose as CloseIcon } from 'react-icons/cg';
import { FaShoppingCart as ShoppingCartIcon, FaDollarSign as DollarIcon } from 'react-icons/fa';
import { sumTotalCost, sumTotalItems, toFriendlyCurrency } from '@multi-cart/util';
import './CartAvatarInner.module.scss';

interface CartAvatarInnerProps {
  variant?: 'white' | 'black',
  cart?: Cart
}

export const CartAvatarInner = ({ variant = 'white', cart }: CartAvatarInnerProps) => {

  return (
    <HStack spacing={4}>
      <Tag size="lg" variant="subtle" colorScheme="green">
        <TagLabel>
          <span data-testid="currentCartTotalItems" className={variant === 'white' ? 'text-white' : 'text-black'}>{sumTotalItems(cart)}</span>
        </TagLabel>
        <TagLeftIcon mr={2} ml={2} boxSize="16px" as={ShoppingCartIcon} />
        <TagLeftIcon mr={0} boxSize="14px" as={DollarIcon} />
        <TagLabel>
          <strong data-testid="currentCartTotalCost" className={variant === 'white' ? 'text-white' : 'text-black'}>{toFriendlyCurrency(sumTotalCost(cart), true)}</strong>
        </TagLabel>
      </Tag>
    </HStack>

  );
}