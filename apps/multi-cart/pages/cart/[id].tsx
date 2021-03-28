import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { EditCartContainer } from '../../appViews/cart/editCart/EditCartContainer';
import { createUrqlClient } from '../../urql-customizations/createUrqlClient';

// -------------------
const CartPage = () => {
    const router = useRouter();
    const nId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    return <EditCartContainer id={nId} />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CartPage);

