import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../_theme/theme';
// import 'regenerator-runtime/runtime';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#1976d2" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
