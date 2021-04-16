import { createUrqlClient } from '@multi-cart/react-data-access';
import { useIsAuth } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { EditCartContainer } from '../../appViews/EditCartContainer';
import 'regenerator-runtime/runtime';
// -------------------
const EditCartPage: NextPage = () => {
    useIsAuth(); // 🛡 session authentication

    return (
        <EditCartContainer />
    );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCartPage);

