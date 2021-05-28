import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import 'regenerator-runtime/runtime';
import { createUrqlClient } from '@multi-cart/react-data-access';
import { ChangePasswordContainer } from '../../appViews/auth/ChangePasswordContainer';

export const ChangePasswordPage: NextPage = () => {
    return (<ChangePasswordContainer />);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePasswordPage);