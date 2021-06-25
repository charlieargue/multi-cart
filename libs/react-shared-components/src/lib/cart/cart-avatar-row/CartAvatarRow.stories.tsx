import { text } from '@storybook/addon-knobs';
import React from 'react';
import { Cart } from '@multi-cart/react-data-access';
import CartAvatarRow, { CartAvatarRowProps } from './CartAvatarRow';
import { Menu, MenuList } from '@chakra-ui/react';

export default {
  component: CartAvatarRow,
  title: 'CartAvatarRow',
};

const carts: Cart[] = [{
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
},
{
  id: "555555-865d-48ea-b5c0-9935f01b5cf1",
  createdAt: "2021-06-25T02:44:38.537Z",
  name: "Cart Two",
  updatedAt: "2021-06-25T04:44:38.537Z",
  userId: "5a3ae987-7e27-42f9-a4bd-b03dd4970015",
  cartLines: [
    {
      id: "34341d457a-2610-4753-8026-754838d79286",
      cartId: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
      categoryId: "1",
      createdAt: "2021-06-25T04:46:26.018Z",
      description: "",
      itemId: "",
      price: .25,
      quantity: 1,
      uom: "EACH",
      updatedAt: "2021-06-25T04:46:26.018Z",
    },
    {
      id: "517101-0a28-4437-bd6f-83cd8bac2dfa",
      cartId: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
      categoryId: "1",
      createdAt: "2021-06-25T04:46:31.285Z",
      description: "",
      itemId: "",
      price: 0.15,
      quantity: 1,
      uom: "EACH",
      updatedAt: "2021-06-25T04:46:31.285Z",
    }
  ]
}];

export const primary = () => {


  return <Menu isOpen={true}>
    <MenuList>
      {carts.map((cart) => (
        <CartAvatarRow
          key={cart.id}
          c={cart}
          currentCartId="555555-865d-48ea-b5c0-9935f01b5cf1" />
      ))}
    </MenuList>
  </Menu>;
};
