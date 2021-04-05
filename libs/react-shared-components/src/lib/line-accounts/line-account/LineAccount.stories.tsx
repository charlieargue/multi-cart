import React from 'react';
import { LineAccount, LineAccountProps } from './LineAccount';
import '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default {
  component: LineAccount,
  title: 'LineAccount',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: LineAccountProps = {
    line: null,
    lineAccount: null
  };

  return <LineAccount line={props.line} lineAccount={props.lineAccount} />;
};
