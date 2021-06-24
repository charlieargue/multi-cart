import React from 'react';
import { ErrMsg } from './ErrMsg';

export default {
  component: ErrMsg,
  title: 'ErrMsg',
};

export const primary = () => {
  return <ErrMsg>Sample Error</ErrMsg>;
};
