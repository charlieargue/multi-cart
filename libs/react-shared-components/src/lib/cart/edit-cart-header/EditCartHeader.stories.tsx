import React from 'react';
import EditCartHeader, { EditCartHeaderProps } from './EditCartHeader';
import { Cart } from '@multi-cart/react-data-access';

export default {
  component: EditCartHeader,
  title: 'EditCartHeader',
};

export const primary = () => {
  
const cart: Cart = {
  id: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
  createdAt: "2021-06-25T04:44:38.537Z",
  name: "Cart One",
  updatedAt: "2021-06-25T04:44:38.537Z",
  userId: "5a3ae987-7e27-42f9-a4bd-b03dd4970015",
  cartLines: [
    {
      id: "ab1d457a-2610-4753-8026-754838d79286",
      cartId: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
      categoryId: "1",
      createdAt: "2021-06-25T04:46:26.018Z",
      description: "Line 1",
      itemId: "101",
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
      description: "Line 2",
      itemId: "102",
      price: 0.75,
      quantity: 2,
      uom: "EACH",
      updatedAt: "2021-06-25T04:46:31.285Z",
    }
  ]
};
  const props: EditCartHeaderProps = {
    cart 
  };

  return <EditCartHeader cart={props.cart} />;
};
