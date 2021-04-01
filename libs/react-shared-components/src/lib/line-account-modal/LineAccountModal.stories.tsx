import React from 'react';
import { LineAccountModal, LineAccountModalProps } from './LineAccountModal';

export default {
  component: LineAccountModal,
  title: 'LineAccountModal',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: LineAccountModalProps = {};

  return <LineAccountModal />;
};
