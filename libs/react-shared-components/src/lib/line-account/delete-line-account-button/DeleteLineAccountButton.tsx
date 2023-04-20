import {
  CartLine,
  CartLineAccount,
  useDeleteCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import React from 'react';
import { TiDelete as DeleteIcon } from 'react-icons/ti';
import { SetPercentageMapType } from '../../cart/cart-line-container/CartLineContainer';

export interface DeleteLineAccountButtonProps {
  lineAccount: CartLineAccount;
  line: CartLine;
<<<<<<< HEAD
  setPercentageMap: SetPercentageMapType;
=======
  setPercentageMap: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
>>>>>>> main
}

export const DeleteLineAccountButton = ({
  lineAccount,
  line,
  setPercentageMap,
}: DeleteLineAccountButtonProps) => {
  const [, deleteCartLineAccount] = useDeleteCartLineAccountMutation();

  return (
    <DeleteIcon
      data-testid="btnDeleteCartLineAccount"
      size="16"
      cursor={'pointer'}
      color="red"
      onClick={async () => {
        await deleteCartLineAccount({
          cartId: line.cartId,
          cartLineId: line.id,
          cartLineAccountId: lineAccount.id,
        });
        setPercentageMap((state) => {
          delete state[lineAccount.id];
          return state;
        });
      }}
    />
  );
};

export default DeleteLineAccountButton;
