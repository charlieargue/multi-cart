import { createUrqlClient } from '@multi-cart/react-data-access';
import { useIsAuth, AppLayout } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { EditCartContainer } from '../../appViews/EditCartContainer';

const EditCartPage: NextPage = () => {
    useIsAuth();

    return (<AppLayout><EditCartContainer /></AppLayout>);
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCartPage);

