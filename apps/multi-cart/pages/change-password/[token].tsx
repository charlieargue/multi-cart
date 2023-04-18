// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { createUrqlClient } from '@multi-cart/react-data-access';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { ChangePasswordContainer } from '../../appViews/auth/ChangePasswordContainer';

export const ChangePasswordPage: NextPage = () => {
    return (<ChangePasswordContainer />);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePasswordPage);