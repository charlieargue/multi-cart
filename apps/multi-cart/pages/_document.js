import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#1976d2" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
