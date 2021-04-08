import { withUrqlClient } from 'next-urql';
import React from 'react';
import { AppLayout } from '../appViews/_layout';
import { createUrqlClient } from '../urql-customizations/createUrqlClient';

const Index = () => {

  return (
    <AppLayout>
      Dashboard
    </AppLayout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);