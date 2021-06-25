import { ThemeProvider } from '@chakra-ui/react';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';
import React from 'react';
import { theme, Providers } from '@multi-cart/react-shared-components';
import '../../../apps/multi-cart/styles/styles.scss';

addDecorator((storyFn) => (
    <ThemeProvider theme={theme}>
        <Providers>
            {storyFn()}
        </Providers>
    </ThemeProvider>
));

addDecorator(withKnobs);
