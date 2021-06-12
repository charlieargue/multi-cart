import { useAccountsQuery } from '@multi-cart/react-data-access';
import { TooltipMC } from '@multi-cart/react-ui';
import React from 'react';
import './LineAccountTooltip.module.scss';

/* eslint-disable-next-line */
export interface LineAccountTooltipProps {
  accountNumber: string;
  children?: React.ReactNode;
}

export function LineAccountTooltip({ accountNumber, children }: LineAccountTooltipProps) {
  const [{ data, fetching }] = useAccountsQuery(); // NOTE: this is instead of adding in one more leftJoinAndSelect() to all the cart/carts queries, etc...

  return (
    <TooltipMC
      label={data?.accounts && data.accounts.find(a => a.accountNumber === accountNumber).accountName}
    >
      {children}
    </TooltipMC>
  );
}

export default LineAccountTooltip;
