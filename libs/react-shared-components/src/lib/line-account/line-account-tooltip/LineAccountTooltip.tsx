import { useAccountsQuery } from '@multi-cart/react-data-access';
import { TooltipMC } from '@multi-cart/react-ui';
import React from 'react';
import './LineAccountTooltip.module.scss';

export interface LineAccountTooltipProps {
  accountNumber: string;
  children?: React.ReactNode;
}

export const LineAccountTooltip = ({
  accountNumber,
  children,
}: LineAccountTooltipProps) => {
  const [{ data }] = useAccountsQuery();

  return (
    <TooltipMC
      label={
        (data?.accounts || []).find((a) => a.accountNumber === accountNumber)
          ?.accountName
      }
    >
      {children}
    </TooltipMC>
  );
};

export default LineAccountTooltip;
