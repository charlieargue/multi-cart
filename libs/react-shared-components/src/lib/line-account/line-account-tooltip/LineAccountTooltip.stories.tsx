
import React from 'react';
import LineAccountTooltip, { LineAccountTooltipProps } from './LineAccountTooltip';

export default {
  component: LineAccountTooltip,
  title: 'LineAccountTooltip',
};

export const primary = () => {
  const props: LineAccountTooltipProps = {
    accountNumber: "36987-1018"
  };

  return <LineAccountTooltip accountNumber={props.accountNumber}>
    Lorem Ipsum
  </LineAccountTooltip>;
};
