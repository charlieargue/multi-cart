import React from 'react';
import { AppLayout } from '../../_layout/app-layout/AppLayout';
import { EditCart, EditCartProps } from './EditCart';

export default {
  component: EditCart,
  title: 'EditCart',
};

export const primary = () => {
  const props: EditCartProps = {
    id: "123245"
  };

  return <AppLayout>
    <EditCart id={props.id} />
  </AppLayout>;
};
