import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { store } from '@multi-cart/react-app-state';
import { theme } from '../theme';
import React from 'react';
import { Provider } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProvidersProps {
  children?: React.ReactNode;
}

// -------------------
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false
        }}>
        <Provider store={store}>
          {children}
        </Provider>
      </ColorModeProvider>
    </ChakraProvider >
  );
};
export default Providers;
