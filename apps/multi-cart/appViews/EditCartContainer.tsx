import { AppLayout, EditCart } from '@multi-cart/react-shared-components';
import { FullScreenSpinner } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditCartContainerProps {

}

export const EditCartContainer = () => {
    const router = useRouter();
    const id = router.query.id as string;

    if (id === undefined) {
        return (<FullScreenSpinner />);
    }

    return (
        <AppLayout>
            <EditCart id={id} />
        </AppLayout>
    );
}