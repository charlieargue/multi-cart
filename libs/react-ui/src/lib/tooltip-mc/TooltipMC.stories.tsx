import React from 'react';
import { TooltipMC, TooltipMCProps } from './TooltipMC';

export default {
  component: TooltipMC,
  title: 'TooltipMC',
};

export const primary = () => {
  const props: TooltipMCProps = {
    label: "45px",
  };

  return <TooltipMC label={props.label}>Sample Child</TooltipMC>;
};
