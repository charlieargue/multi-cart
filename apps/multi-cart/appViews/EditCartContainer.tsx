import { AppLayout, EditCart } from '@multi-cart/react-shared-components';
import { FullScreenSpinner } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditCartContainerProps {

}

export const EditCartContainer = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const [isSplashing, setIsSplashing] = useState(true);

    if (id !== undefined && isSplashing === true) {
        setTimeout(() => setIsSplashing(false), 1000);
    }
    
    // TODO: make this a global settings!
    // if (isSplashing) {
    //     return (<FullScreenSpinner />);
    // }

    return (
        <AppLayout>
            <EditCart id={id} />
        </AppLayout>
    );
}