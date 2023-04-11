// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { createUrqlClient } from '@multi-cart/react-data-access';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { LoginContainer } from '../appViews/auth/LoginContainer';

const LoginPage: NextPage = () => {
  return <LoginContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(LoginPage);