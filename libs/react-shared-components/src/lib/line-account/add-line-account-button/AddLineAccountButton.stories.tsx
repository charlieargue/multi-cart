import { Stack } from '@chakra-ui/react';
import React from 'react';
import { areLineAccountsValid } from '@multi-cart/util';
import AddLineAccountButton, { AddLineAccountButtonProps } from './AddLineAccountButton';

export default {
  component: AddLineAccountButton,
  title: 'AddLineAccountButton',
};

export const primary = () => {
  const props: AddLineAccountButtonProps = {
    btnRef: undefined,
    clickHandler: () => alert('Clicked')
  };

  return <Stack
    direction="row"
    spacing={4}
    align="center"
    mt={1}
    px={4}
    py={3}
    rounded="md"
    shadow="unset">
    Sample Text
    <AddLineAccountButton btnRef={props.btnRef} clickHandler={props.clickHandler} />
  </Stack>;
};
