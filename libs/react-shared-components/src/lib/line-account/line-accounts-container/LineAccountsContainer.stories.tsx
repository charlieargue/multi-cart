import React from 'react';
import {
  LineAccountsContainer,
  LineAccountsContainerProps,
} from './LineAccountsContainer';

export default {
  component: LineAccountsContainer,
  title: 'LineAccountsContainer',
};

export const withDefaultState = () => {
  const props: LineAccountsContainerProps = {};

  return <LineAccountsContainer />;
};
