import React from 'react';
import Providers from '../providers/Providers';
import '../_theme/styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
