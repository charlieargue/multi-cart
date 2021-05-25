import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { LandingContainer } from '../appViews/LandingContainer';
import 'regenerator-runtime/runtime';
import { createUrqlClient } from '../urql/createUrqlClient';

const Index: NextPage = () => {

  return (
    <LandingContainer />
  );
}

// SSR for SEO, etc.
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);