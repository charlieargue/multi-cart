import React from 'react';
import { LineAccount, LineAccountProps } from './LineAccount';

export default {
  component: LineAccount,
  title: 'LineAccount',
};

export const primary = () => {
  const props: LineAccountProps = {
    line: null,
    lineAccount: null
  };

  return <LineAccount line={props.line} lineAccount={props.lineAccount} />;
};
