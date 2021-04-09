import React from 'react'
import { createUrqlClient } from '@multi-cart/react-data-access';
import { withUrqlClient } from 'next-urql';
import { LoginContainer } from '../appViews/auth/LoginContainer';

// ------------------- TODO: put this in LoginContainer, and rename Login to LoginForm
const LoginPage = () => {
  return <LoginContainer />;
};

export default withUrqlClient(createUrqlClient)(LoginPage);