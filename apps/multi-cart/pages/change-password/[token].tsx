import { createUrqlClient } from '@multi-cart/react-data-access';
import { ChangePassword } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import 'regenerator-runtime/runtime';
export const ChangePasswordPage: NextPage = () => {
    return (<ChangePassword />);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePasswordPage);