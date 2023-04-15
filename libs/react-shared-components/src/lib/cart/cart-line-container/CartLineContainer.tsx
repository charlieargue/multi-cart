import { CartLineContextProvider } from '@multi-cart/react-app-state';
import {
  CartLine,
  useUpdateCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import { computeAmountGivenPercentage } from '@multi-cart/util';
import React from 'react';
import LineAccountsContainer from '../../line-account/line-accounts-container/LineAccountsContainer';
import CartLineForm from '../cart-line-form/CartLineForm';

export interface CartLineContainerProps {
  line: CartLine;
  idx: number;
}

export const CartLineContainer = ({ line, idx }: CartLineContainerProps) => {
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();
  
  const saveLineAccount = async (
    newPercentage: number,
    lineAccountId: string
  ) => {
    const newAmount = computeAmountGivenPercentage({
      linePrice: line.price,
      lineQuantity: line.quantity,
      lineTax: 0,
      lineAccountPercentage: newPercentage,
    });
    await updateCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      id: lineAccountId,
      amount: newAmount,
    });
  };

  if (!line) {
    return <div>Loading...</div>;
  }

  return (
    <CartLineContextProvider>
      <CartLineForm idx={idx} line={line} saveLineAccount={saveLineAccount} />
      <LineAccountsContainer
        line={line}
        saveLineAccount={saveLineAccount}
      />
    </CartLineContextProvider>
  );
};

export default CartLineContainer;
