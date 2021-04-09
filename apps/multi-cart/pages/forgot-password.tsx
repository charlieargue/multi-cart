import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '@multi-cart/react-data-access';
import { ForgotPasswordContainer } from '../appViews/auth/ForgotPasswordContainer';

const ForgotPasswordPage = () => {

    return (<ForgotPasswordContainer />);
}

export default withUrqlClient(createUrqlClient)(ForgotPasswordPage);