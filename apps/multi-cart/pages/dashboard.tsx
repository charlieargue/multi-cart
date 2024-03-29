import { createUrqlClient } from '@multi-cart/react-data-access';
import { useIsAuth } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { DashboardContainer } from '../appViews/DashboardContainer';

const DashboardPage: NextPage = () => {
  useIsAuth();
  
  return (
    <DashboardContainer />
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(DashboardPage);