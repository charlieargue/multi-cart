import { ColorModeScript, ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { addDecorator } from '@storybook/react';
import { store } from '@multi-cart/react-app-state';
import React from 'react';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';

import { theme } from '@multi-cart/react-shared-components';


addDecorator((storyFn) => (
    <ChakraProvider resetCSS>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ColorModeProvider
            options={{
                useSystemColorMode: false,
            }}>
            <Provider store={store}>
                {storyFn()}
            </Provider>
        </ColorModeProvider>
    </ChakraProvider>
));

addDecorator(withKnobs);
