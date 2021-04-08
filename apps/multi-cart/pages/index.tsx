import { withUrqlClient } from 'next-urql';
import React from 'react';
import { AppLayout } from '@multi-cart/react-shared-components';
import { createUrqlClient } from '../urql-customizations/createUrqlClient';

const Index = () => {

  return (
    <AppLayout>
      Dashboard
    </AppLayout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);