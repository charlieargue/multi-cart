import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'regenerator-runtime/runtime';
import theme from '../_theme/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Toaster />
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider >
  )
}

export default MyApp
