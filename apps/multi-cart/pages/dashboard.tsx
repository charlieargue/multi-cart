import { useIsAuth } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { DashboardContainer } from '../appViews/DashboardContainer';
import 'regenerator-runtime/runtime';
import { createUrqlClient } from '@multi-cart/react-data-access';

const DashboardPage: NextPage = () => {
  useIsAuth(); // 🛡 session authentication
  
  return (
    <DashboardContainer />
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(DashboardPage);