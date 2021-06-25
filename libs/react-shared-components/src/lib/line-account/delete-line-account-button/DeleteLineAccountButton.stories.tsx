import { Stack } from '@chakra-ui/react';
import React from 'react';
import DeleteLineAccountButton, { DeleteLineAccountButtonProps } from './DeleteLineAccountButton';
import { CartLineAccount, CartLine } from '@multi-cart/react-data-access';

export default {
  component: DeleteLineAccountButton,
  title: 'DeleteLineAccountButton',
};

export const primary = () => {
  const props: DeleteLineAccountButtonProps = {
    lineAccount: {} as CartLineAccount,
    line: {} as CartLine,
  };

  return <DeleteLineAccountButton lineAccount={props.lineAccount} line={props.line} />;
};
