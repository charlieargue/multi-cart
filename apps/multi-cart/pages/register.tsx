import { createUrqlClient } from '@multi-cart/react-data-access';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { RegisterContainer } from '../appViews/auth/RegisterContainer';

// -------------------
const RegisterPage = () => {
    return <RegisterContainer />;
};

export default withUrqlClient(createUrqlClient)(RegisterPage);