import React from 'react';
import { AppLayout, EditCart } from '@multi-cart/react-shared-components';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditCartContainerProps {

}

export const EditCartContainer = () => {
    const router = useRouter();
    return (
        <AppLayout>
            <EditCart id={router.query.id as string} />
        </AppLayout>
    );
}