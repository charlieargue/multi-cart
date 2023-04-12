// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################
import { CartLine } from '@multi-cart/react-data-access';
import React from 'react';
import LineAccountsContainer from '../../line-account/line-accounts-container/LineAccountsContainer';
import CartLineForm from '../cart-line-form/CartLineForm';

export interface CartLineContainerProps {
  line: CartLine;
  idx: number;
}

export const CartLineContainer = ({ line, idx }: CartLineContainerProps) => {
  if (!line) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CartLineForm idx={idx} line={line} />
      <LineAccountsContainer line={line} />
    </>
  );
};

export default CartLineContainer;
