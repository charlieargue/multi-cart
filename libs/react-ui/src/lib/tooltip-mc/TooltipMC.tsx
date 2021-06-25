import { Placement, Tooltip } from '@chakra-ui/react';
import React from 'react';
import './TooltipMC.module.scss';

export interface TooltipMCProps {
  label: string;
  children?: React.ReactNode;
  placement?: Placement;
}

// ------------------- MultiCart Tooltip
export function TooltipMC({ label, children, placement = "bottom" }: TooltipMCProps) {
  return (
    <Tooltip
      hasArrow
      label={label}
      bg="gray.300"
      color="black"
      placement={placement}>
      {children}
    </Tooltip>
  );
}

export default TooltipMC;
