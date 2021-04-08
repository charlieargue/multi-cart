import { withUrqlClient } from 'next-urql';
import React from 'react';
import { AppLayout } from '@multi-cart/react-shared-components';
import { createUrqlClient } from '@multi-cart/react-data-access';

const Index = () => {

  return (
    <AppLayout>
      Dashboard
    </AppLayout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);