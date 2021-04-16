import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '@multi-cart/react-data-access';
import { ForgotPasswordContainer } from '../appViews/auth/ForgotPasswordContainer';
import { NextPage } from 'next';
import 'regenerator-runtime/runtime';

const ForgotPasswordPage: NextPage = () => {

    return (<ForgotPasswordContainer />);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ForgotPasswordPage);