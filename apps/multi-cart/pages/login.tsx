import { createUrqlClient } from '@multi-cart/react-data-access';
import { Login } from '@multi-cart/react-shared-components';
import { withUrqlClient } from 'next-urql';
import React from 'react';

// -------------------
const LoginPage = () => {
  return <Login />;
};

export default withUrqlClient(createUrqlClient)(Login);