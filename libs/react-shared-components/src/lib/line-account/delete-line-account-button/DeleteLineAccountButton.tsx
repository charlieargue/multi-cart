import {
  CartLine,
  CartLineAccount,
  useDeleteCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import React from 'react';
import { TiDelete as DeleteIcon } from 'react-icons/ti';
import './DeleteLineAccountButton.module.scss';

export interface DeleteLineAccountButtonProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

export const DeleteLineAccountButton = ({
  lineAccount,
  line,
}: DeleteLineAccountButtonProps) => {
  const [, deleteCartLineAccount] = useDeleteCartLineAccountMutation();

  return (
    <DeleteIcon
      data-testid="btnDeleteCartLineAccount"
      size="16"
      cursor={'pointer'}
      color="red"
      onClick={() =>
        deleteCartLineAccount({
          cartId: line.cartId,
          cartLineId: line.id,
          cartLineAccountId: lineAccount.id,
        })
      }
    />
  );
};

export default DeleteLineAccountButton;
