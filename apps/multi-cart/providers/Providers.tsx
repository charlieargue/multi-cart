import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import 'regenerator-runtime/runtime';
import { AppStateContextController } from '../context/appState/AppStateContextController';
import theme from '../_theme/theme';

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
        <AppStateContextController>
          {children}
        </AppStateContextController>
      </ColorModeProvider>
    </ChakraProvider >
  );
};
export default Providers;
