import { createUrqlClient } from '@multi-cart/react-data-access';
import { AppLayout } from '@multi-cart/react-shared-components';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { LandingContainer } from '../appViews/LandingContainer';

const Index = () => {

  return (
    <LandingContainer />
  );
}

export default withUrqlClient(createUrqlClient)(Index);