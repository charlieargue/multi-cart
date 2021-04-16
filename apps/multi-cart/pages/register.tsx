import { createUrqlClient } from '@multi-cart/react-data-access';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { RegisterContainer } from '../appViews/auth/RegisterContainer';
import 'regenerator-runtime/runtime';

// -------------------
const RegisterPage: NextPage = () => {
    return <RegisterContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);