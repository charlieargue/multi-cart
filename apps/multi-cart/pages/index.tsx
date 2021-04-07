import { withUrqlClient } from 'next-urql';
import React from 'react';
import { AppLayout } from '../appViews/_layout';
import { createUrqlClient } from '../urql-customizations/createUrqlClient';
import { ReactUi } from '@multi-cart/react-ui';

const Index = () => {

  return (
    <AppLayout>
      Dashboard
      <ReactUi />
    </AppLayout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);