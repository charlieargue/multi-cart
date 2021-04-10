import React from 'react';
import { AppLayout } from '@multi-cart/react-shared-components';
import { Breadcrumbs } from '@multi-cart/react-ui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardContainerProps {

}

export const DashboardContainer = () => {
    return (
        <AppLayout>
            <Breadcrumbs links={[]} />
        </AppLayout>);
};