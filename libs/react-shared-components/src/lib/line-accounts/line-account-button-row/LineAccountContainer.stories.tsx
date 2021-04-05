import React from 'react';
import {
  LineAccountButtonRow,
  LineAccountButtonRowProps,
} from './LineAccountButtonRow';

export default {
  component: LineAccountButtonRow,
  title: 'LineAccountButtonRow',
};

export const withDefaultState = () => {
  /* eslint-disable-next-line */
  const props: LineAccountButtonRowProps = {};

  return <LineAccountButtonRow />;
};
