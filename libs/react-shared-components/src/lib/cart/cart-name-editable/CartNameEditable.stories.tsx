import React from 'react';
import { CartNameEditable, CartNameEditableProps } from './CartNameEditable';

export default {
  component: CartNameEditable,
  title: 'CartNameEditable',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: CartNameEditableProps = {
    name: "Initial Name",
    id: "12345"
  };

  return <CartNameEditable name={props.name} id={props.id} />;
};
