import React from 'react';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../_theme/theme';
import "regenerator-runtime/runtime.js";

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider resetCSS theme={theme}>
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
