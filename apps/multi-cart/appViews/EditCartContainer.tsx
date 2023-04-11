// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { AppLayout, EditCart } from '@multi-cart/react-shared-components';
import { FullScreenSpinner } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const EditCartContainer = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const [isSplashing, setIsSplashing] = useState(true);

    if (id !== undefined && isSplashing === true) {
        setTimeout(() => setIsSplashing(false), 600);
    }
    
    // TODO: make this toggleable as a global settings!
    if (isSplashing) {
        return (<FullScreenSpinner />);
    }

    return (
        <AppLayout>
            <EditCart id={id} />
        </AppLayout>
    );
}
