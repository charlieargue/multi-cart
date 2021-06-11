import React from 'react';
// // import 'regenerator-runtime/runtime';
import Providers from '../providers/Providers';


function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
