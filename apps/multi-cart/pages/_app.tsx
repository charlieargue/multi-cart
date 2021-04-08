// import '../_theme/app.scss';
import React from 'react';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../_theme/theme';

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider >
  )
}

export default MyApp
