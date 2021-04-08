import './CartAvatarInner.module.scss';
import clsx from 'clsx';
import { Cart } from '@multi-cart/react-data-access';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { Cart3 } from 'react-bootstrap-icons';
import { sumTotalItems, sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';

interface CartAvatarInnerProps {
  variant?: 'white' | 'black',
  cart?: Cart
}

export const CartAvatarInner = ({ variant = 'white', cart }: CartAvatarInnerProps) => {

  return (
    <>
      <span data-testid="currentCartTotalItems" className={variant === 'white' ? 'text-white' : 'text-black'}>{sumTotalItems(cart)}</span>
                &nbsp;
      <Cart3 color={variant} className="ml-0 mr-2 align-text-top" />
      <Badge pill className={clsx(['fw-bold mr-1 px-2 py-1', variant === 'white' ? 'bg-white text-dark' : 'bg-dark text-white'])}>$</Badge>
      <strong data-testid="currentCartTotalCost" className={variant === 'white' ? 'text-white' : 'text-black'}>{toFriendlyCurrency(sumTotalCost(cart), true)}</strong>
    </>
  );
}