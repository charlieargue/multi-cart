import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { LoginContainer } from '../appViews/auth/LoginContainer';
import 'regenerator-runtime/runtime';
import { createUrqlClient } from '@multi-cart/react-data-access';

const LoginPage: NextPage = () => {
  return <LoginContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(LoginPage);