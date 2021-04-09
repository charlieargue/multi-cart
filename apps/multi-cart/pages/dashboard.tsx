import { createUrqlClient } from '@multi-cart/react-data-access';
import { useIsAuth } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';

const Dashboard: NextPage = () => {
  useIsAuth(); // 🛡 session authentication

  return (
    <Dashboard />
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Dashboard);