import { createUrqlClient } from '@multi-cart/react-data-access';
import { Register } from '@multi-cart/react-shared-components';
import { withUrqlClient } from 'next-urql';
import React from 'react';

// -------------------
const RegisterPage = () => {
    return <Register />;
};

export default withUrqlClient(createUrqlClient)(RegisterPage);