import React from 'react';
import { FullScreenSpinner, FullScreenSpinnerProps } from './FullScreenSpinner';

export default {
  component: FullScreenSpinner,
  title: 'FullScreenSpinner',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: FullScreenSpinnerProps = {};

  return <FullScreenSpinner />;
};
