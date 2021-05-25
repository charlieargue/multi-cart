import { withUrqlClient } from 'next-urql';
import React from 'react';
import { ForgotPasswordContainer } from '../appViews/auth/ForgotPasswordContainer';
import { NextPage } from 'next';
import 'regenerator-runtime/runtime';
import { createUrqlClient } from '../urql/createUrqlClient';

const ForgotPasswordPage: NextPage = () => {

    return (<ForgotPasswordContainer />);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ForgotPasswordPage);