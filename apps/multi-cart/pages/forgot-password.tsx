import { withUrqlClient } from 'next-urql';
import React from 'react';
import { ForgotPassword } from '@multi-cart/react-shared-components';
import { createUrqlClient } from '@multi-cart/react-data-access';

const ForgotPasswordPage = () => {

    return (<ForgotPassword />);
}

export default withUrqlClient(createUrqlClient)(ForgotPasswordPage);