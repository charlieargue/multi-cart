import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { RegisterContainer } from '../appViews/auth/RegisterContainer';
// import 'regenerator-runtime/runtime';
import { createUrqlClient } from '@multi-cart/react-data-access';

// -------------------
const RegisterPage: NextPage = () => {
    return <RegisterContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);