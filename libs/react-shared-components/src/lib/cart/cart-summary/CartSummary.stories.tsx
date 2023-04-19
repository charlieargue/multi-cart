import React from 'react';
import { CartSummary, CartSummaryProps } from './CartSummary';
import { Cart } from '@multi-cart/react-data-access';

export default {
  component: CartSummary,
  title: 'CartSummary',
};

export const primary = () => {

  const cart: Cart = {
    id: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
    createdAt: "2021-06-25T04:44:38.537Z",
    name: "Cart 2021-06-25 04:44",
    updatedAt: "2021-06-25T04:44:38.537Z",
    userId: "5a3ae987-7e27-42f9-a4bd-b03dd4970015",
    cartLines: [
      {
        id: "ab1d457a-2610-4753-8026-754838d79286",
        cartId: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
        categoryId: "1",
        createdAt: "2021-06-25T04:46:26.018Z",
        description: "",
        itemId: "",
        price: 1.25,
        quantity: 1,
        uom: "EACH",
        updatedAt: "2021-06-25T04:46:26.018Z",
      },
      {
        id: "38a17101-0a28-4437-bd6f-83cd8bac2dfa",
        cartId: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
        categoryId: "1",
        createdAt: "2021-06-25T04:46:31.285Z",
        description: "",
        itemId: "",
        price: 0.75,
        quantity: 2,
        uom: "EACH",
        updatedAt: "2021-06-25T04:46:31.285Z",
      }
    ]
  }
  const props: CartSummaryProps = {
    cart
  };
  return <CartSummary cart={props.cart} />;
};
