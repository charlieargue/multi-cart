import { Placement, Tooltip } from '@chakra-ui/react';
import React from 'react';
import './TooltipMC.module.scss';

export interface TooltipMCProps {
  label: string;
  children?: React.ReactNode;
  placement?: Placement;
  isHidden?: boolean;
}

export const TooltipMC = ({
  label,
  children,
  placement = 'bottom',
  isHidden = false,
}: TooltipMCProps) => {
  return (
    <Tooltip
      hidden={isHidden}
      hasArrow
      label={label}
      bg="gray.300"
      color="black"
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipMC;
