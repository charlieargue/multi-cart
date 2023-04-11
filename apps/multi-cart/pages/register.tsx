// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { createUrqlClient } from '@multi-cart/react-data-access';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { RegisterContainer } from '../appViews/auth/RegisterContainer';

// -------------------
const RegisterPage: NextPage = () => {
    return <RegisterContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);