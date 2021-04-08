import { createUrqlClient } from '@multi-cart/react-data-access';
import { EditCart } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';

// -------------------
const CartPage: NextPage = () => {
    const router = useRouter();
    const nId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    return <EditCart id={nId} />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CartPage);

