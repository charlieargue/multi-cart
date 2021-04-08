import { createUrqlClient } from '@multi-cart/react-data-access';
import { AppLayout } from '@multi-cart/react-shared-components';
import { withUrqlClient } from 'next-urql';
import React from 'react';

const Index = () => {

  return (
    <AppLayout>
      Dashboard
    </AppLayout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);