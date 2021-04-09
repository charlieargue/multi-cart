import { createUrqlClient } from '@multi-cart/react-data-access';
import { AppLayout } from '@multi-cart/react-shared-components';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useIsAuth } from '@multi-cart/react-shared-components';

// TODO: make this LANDING PAGE (and NO AUTH!
// THEN make this actual DASHBOARD!)

const Index = () => {
  useIsAuth(); // 🛡 session authentication

  return (
    <AppLayout>
      Dashboard
    </AppLayout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);