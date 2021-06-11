import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
// import 'regenerator-runtime/runtime';
import theme from '../_theme/theme';
import { Provider } from 'react-redux'
import { store } from '@multi-cart/react-app-state';

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
          useSystemColorMode: false,
        }}>
        <Provider store={store}>
          {children}
        </Provider>
      </ColorModeProvider>
    </ChakraProvider >
  );
};
export default Providers;
