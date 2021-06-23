import React from 'react';
import { Providers } from '@multi-cart/react-shared-components';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
