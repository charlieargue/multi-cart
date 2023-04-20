import {
  CartLine,
  useUpdateCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import { computeAmountGivenPercentage } from '@multi-cart/util';
import React, { useState } from 'react';
import LineAccountsContainer from '../../line-account/line-accounts-container/LineAccountsContainer';
import CartLineForm from '../cart-line-form/CartLineForm';

export interface CartLineContainerProps {
  line: CartLine;
  idx: number;
}

<<<<<<< HEAD
export type SaveLineAccountFnType = (
  newPercentage: number,
  lineAccountId: string,
  line: CartLine
) => void;

export type SetPercentageMapType = React.Dispatch<
  React.SetStateAction<Record<string, number>>
>;

=======
>>>>>>> main
export const CartLineContainer = ({ line, idx }: CartLineContainerProps) => {
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();
  const [percentageMap, setPercentageMap] = useState<Record<string, number>>(
    {}
  );

<<<<<<< HEAD
  const saveLineAccount: SaveLineAccountFnType = async (
=======
  const saveLineAccount = async (
>>>>>>> main
    newPercentage: number,
    lineAccountId: string,
    line: CartLine
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
    <>
      <CartLineForm
        idx={idx}
        line={line}
        saveLineAccount={saveLineAccount}
        percentageMap={percentageMap}
      />
      <LineAccountsContainer
        line={line}
        saveLineAccount={saveLineAccount}
        setPercentageMap={setPercentageMap}
      />
    </>
  );
};

export default CartLineContainer;
