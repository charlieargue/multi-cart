import React from 'react';
import { AppLayout, EditCart } from '@multi-cart/react-shared-components';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditCartContainerProps {

}

export const EditCartContainer = () => {
    const router = useRouter();
    const nId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    return (
        <AppLayout>
            <EditCart id={nId} />
        </AppLayout>
    );
}