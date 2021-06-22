import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import theme from '../_theme/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* <title>TODO: </title> */}
          <meta charset="utf-8" />
          <meta name="robots" content="noodp" />
          <meta name="description" content="TODO: ..." />
          <meta name="theme-color" content="#1976d2" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          {/* TODO: <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8134ff" /> */}
          {/* TODO: <link rel="manifest" href="/manifest.json" /> */}
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
