import { createUrqlClient } from '@multi-cart/react-data-access';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { LoginContainer } from '../appViews/auth/LoginContainer';
import 'regenerator-runtime/runtime';

const LoginPage: NextPage = () => {
  return <LoginContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(LoginPage);