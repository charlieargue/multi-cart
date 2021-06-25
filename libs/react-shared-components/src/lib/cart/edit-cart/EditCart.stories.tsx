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

// primary.parameters = {
//   urql: op => {
//     console.log(`🚀 ~ op.query`, op.query);
//     // if (getQueryName(op.query) === 'GetUser') {
//     //   return { data: { user: { id: 1234, name: 'Steve' } } };
//     // }

//     // if (getQueryName(op.query) === 'GetFeed') {
//     //   return { data: { feed: [{ id: 1, title: 'Fake news' }] } };
//     // }
//   },
// };