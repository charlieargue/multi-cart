import { text } from '@storybook/addon-knobs';
import React from 'react';
import { AppLayout, AppLayoutProps } from './AppLayout';

export default {
  component: AppLayout,
  title: 'AppLayout',
};

export const primary = () => {
  const props: AppLayoutProps = {
    
  };
  
  return <AppLayout>Testing</AppLayout>;
};
