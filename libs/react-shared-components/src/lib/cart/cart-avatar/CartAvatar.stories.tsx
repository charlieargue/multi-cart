import { text } from '@storybook/addon-knobs';
import React from 'react';
import { CartAvatar, CartAvatarProps } from './CartAvatar';

export default {
  component: CartAvatar,
  title: 'CartAvatar',
};

export const primary = () => {
  const props: CartAvatarProps = {
    currentCartId: text("currentCartId", undefined),

  };
  return <CartAvatar
    currentCartId={props.currentCartId}
  />;
};
