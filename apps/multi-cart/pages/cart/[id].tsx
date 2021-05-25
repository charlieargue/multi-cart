import { useIsAuth } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { EditCartContainer } from '../../appViews/EditCartContainer';
import 'regenerator-runtime/runtime';
import { createUrqlClient } from '../../urql/createUrqlClient';

// -------------------
const EditCartPage: NextPage = () => {
    useIsAuth(); // 🛡 session authentication

    return (
        <EditCartContainer />
    );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCartPage);

