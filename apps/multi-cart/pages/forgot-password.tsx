// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { createUrqlClient } from '@multi-cart/react-data-access';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { ForgotPasswordContainer } from '../appViews/auth/ForgotPasswordContainer';

const ForgotPasswordPage: NextPage = () => {

    return (<ForgotPasswordContainer />);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ForgotPasswordPage);