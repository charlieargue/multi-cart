// thx: https://storybook.js.org/addons/storybook-addon-next-router
import { ThemeProvider } from '@chakra-ui/react';
import { Providers, theme } from '@multi-cart/react-shared-components';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

addDecorator(
    withNextRouter({
        path: '/', // defaults to `/`
        asPath: '/', // defaults to `/`
        query: {}, // defaults to `{}`
        push() { } // defaults to using addon actions integration, can override any method in the router
    })
);


addDecorator((storyFn) => (
    <ThemeProvider theme={theme}>
        <Providers>
                {storyFn()}
        </Providers>
    </ThemeProvider>
));

addDecorator(withKnobs);
