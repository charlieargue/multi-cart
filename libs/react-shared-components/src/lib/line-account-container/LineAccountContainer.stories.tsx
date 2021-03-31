import React from 'react';
import {
  LineAccountContainer,
  LineAccountContainerProps,
} from './LineAccountContainer';

export default {
  component: LineAccountContainer,
  title: 'LineAccountContainer',
};

export const withDefaultState = () => {
  /* eslint-disable-next-line */
  const props: LineAccountContainerProps = {};

  return <LineAccountContainer />;
};
