import React from 'react';
import { AppLayout, EditCart } from '@multi-cart/react-shared-components';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditCartContainerProps {

}

export const EditCartContainer = () => {
    const router = useRouter();
    const id = router.query.id as string;

    // TODO: switch to suspence?
    if (id === undefined) {
        return (<div>🟢 Loading...</div>);
    }

    return (
        <AppLayout>
            <EditCart id={id} />
        </AppLayout>
    );
}